using AppCore.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Text;

namespace Infrastructure;
public static class Dependencies
{
    public static void ConfigServices(IConfiguration config, IServiceCollection services)
    {
        services.AddDbContext<Context>(c => c.UseSqlite(config.GetConnectionString("Db")));

    }
}