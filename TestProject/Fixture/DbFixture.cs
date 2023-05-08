using AppCore.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Test;

public class DbFixture : IDisposable
{
    private const string InMemoryConnectionString = "Data Source=Db.sqlite";
    public Context _context;
    private readonly SqliteConnection _connection;
    public DbFixture()
    {
        _connection = new SqliteConnection(InMemoryConnectionString);
        _connection.Open();
        var options = new DbContextOptionsBuilder<Context>()
                .UseSqlite(_connection)
                .Options;
        _context = new Context(options);
        _context.Database.EnsureCreated();
    }

    public void Dispose()
    {
        _connection.Close();
    }
}