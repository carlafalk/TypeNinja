using AppCore.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;


namespace Infrastructure;
public static class Dependencies
{
    public static void ConfigServices(IConfiguration config, IServiceCollection services)
    {
        services.AddDbContext<Context>(c => c.UseSqlite(config.GetConnectionString("Db")));

        services.AddIdentityCore<IdentityUser>()
        .AddEntityFrameworkStores<Context>()
        .AddDefaultTokenProviders();

        // services.AddIdentity<IdentityUser, IdentityRole>()
        // .AddEntityFrameworkStores<Context>()
        // .AddDefaultTokenProviders();

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