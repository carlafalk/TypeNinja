using AppCore.Infrastructure;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace Test;

public class DbFixture : IDisposable
{
    private const string InMemoryConnectionString = "Data Source=Db.sqlite";
    public Context context { get; set; }
    private readonly SqliteConnection _connection;
    public DbFixture()
    {
        _connection = new SqliteConnection(InMemoryConnectionString);
        _connection.Open();
        var options = new DbContextOptionsBuilder<Context>()
                .UseSqlite(_connection)
                .Options;
        context = new Context(options);
        context.Database.EnsureCreated();
    }

    public void Dispose()
    {
        _connection.Close();
    }
}