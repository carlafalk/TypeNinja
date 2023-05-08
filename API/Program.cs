using System.Text;
using AppCore.Infrastructure;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Dependencies.ConfigServices(builder.Configuration, builder.Services);

//adding sqlite db 

builder.Services.AddDbContext<Context>(c => c.UseSqlite(builder.Configuration.GetConnectionString("Db")));

var test = Directory.GetCurrentDirectory();
var directory = new DirectoryInfo(Directory.GetCurrentDirectory());
var dotenvPath = Path.Combine(directory.Parent.FullName, ".env");
DotEnv.Load("C:\\skola\\TypeNinja\\.env");
// DotEnv.Load(dotenvPath);


var configBuilder = new ConfigurationBuilder().AddEnvironmentVariables().Build();

builder.Services.AddIdentityCore<IdentityUser>(opt => 
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
builder.Services.AddCors(options => options.AddDefaultPolicy(builder => builder.WithOrigins("http://127.0.0.1:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));

builder.Services.AddAuthentication(options => {
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
        ValidAudience = builder.Configuration.GetValue<string>("JWT:ValidAudience"),
        ValidIssuer = builder.Configuration.GetValue<string>("JWT:ValidIssuer"),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("JWT:Secret")))
    };
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }
