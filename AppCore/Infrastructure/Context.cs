using Microsoft.EntityFrameworkCore;

namespace AppCore.Entities;

public class Context : DbContext
{
    public DbSet<Highscore> Highscores {get; set;}
    public DbSet<User> Users { get; set; }

    public Context(DbContextOptions<Context> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}
