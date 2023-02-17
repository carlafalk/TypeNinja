using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AppCore.Entities;

public class Context : IdentityDbContext<IdentityUser>
{
    public DbSet<Highscore> Highscores {get; set;}
    // public DbSet<User> UsersTEST { get; set; }

    public Context(DbContextOptions<Context> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}
