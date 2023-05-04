using AppCore.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AppCore.Infrastructure;
using Microsoft.Extensions.Options;

namespace Infrastructure;
public static class Dependencies
{
    public static void ConfigServices(IConfiguration config, IServiceCollection services)
    {
        //adding sqlite db 
        services.AddDbContext<Context>(c => c.UseSqlite(config.GetConnectionString("Db")));

        services.AddIdentityCore<IdentityUser>(opt => 
        {
            //password settings 

            opt.Password.RequireDigit = true;
            opt.Password.RequiredLength = 6;
            opt.Password.RequireNonAlphanumeric = false;
            opt.Password.RequireUppercase = false;
            opt.Password.RequireLowercase = false;
            opt.Password.RequiredUniqueChars = 1;
        })
        .AddEntityFrameworkStores<Context>()
        .AddDefaultTokenProviders();
        services.AddCors(options => options.AddDefaultPolicy(builder => builder.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));

        services.AddAuthentication(options => {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options => 
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidAudience = config["JWT:ValidAudience"],
                ValidIssuer = config["JWT:ValidIssuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Secret"]))
            };
        });

    }
}