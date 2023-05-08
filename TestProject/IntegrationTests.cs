using API.Dtos;
using AppCore.Entities;
using AppCore.Infrastructure;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.IdentityModel.Tokens;
using Moq;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Text.Json;
using API;
using Xunit;
using Microsoft.Extensions.Configuration;
using Infrastructure;

namespace Test.Fixture.WebAppFactory;

public class IntegrationTests : IClassFixture<WebApplicationFactory<Program>>, IClassFixture<DbFixture>
{
    private readonly HttpClient httpClient;
    private readonly DbFixture dbFixture;
    
    public IntegrationTests(WebApplicationFactory<Program> factory, DbFixture _context)
    {
        if (_context == null || factory == null)
        {
            throw new ArgumentNullException("httpClient or context is null");
        }

        httpClient = factory.CreateClient();
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", CreateMockToken());
        dbFixture = _context;      
    }
    

    [Fact]
    public async void TestThatYouCanGetAllHighScores()
    {
        //ARRANGE
        var httpResponseMessage = await httpClient.GetAsync("Highscore");
        var responseBody = await httpResponseMessage.Content.ReadAsStringAsync();
        var nrOfHighscores = JsonSerializer.Deserialize<List<HighscoreDto>>(responseBody);
        var highScoreToInsert = new Highscore(){
            WPM = 30,
            Accuracy = 0.98m,
            Id = Guid.NewGuid(),
            UserId = Guid.NewGuid(),
            Username = "Carl"
        };

        // ACT
        var insertedHighscore = dbFixture._context.Highscores.Add(highScoreToInsert).Entity;
        await dbFixture._context.SaveChangesAsync();

        httpResponseMessage = await httpClient.GetAsync("Highscore");
        responseBody = await httpResponseMessage.Content.ReadAsStringAsync();
        var nrOfHighscoresAfterInsert = JsonSerializer.Deserialize<List<HighscoreDto>>(responseBody)!;

        // var test = dbFixture._context.Highscores.ToList();
        // var count = test.Count();

        // ASSERT
        nrOfHighscores.Count.Should().Be(nrOfHighscoresAfterInsert.Count - 1);
        httpResponseMessage.StatusCode.Should().Be(HttpStatusCode.OK);
        // nrOfHighscoresAfterInsert.Count.Should().Be(1);

        // CLEAN UP
        dbFixture._context.Highscores.Remove(insertedHighscore);
        await dbFixture._context.SaveChangesAsync();
    }

    [Fact]
    public async void TestThatYouCanPostHighscore()
    {
        //ARRANGE
        var id = Guid.NewGuid();
        var numberOfHighscoresBeforePost = dbFixture._context.Highscores.Count();
        var highScoreToInsert = new Highscore(){
            WPM = 30,
            Accuracy = 0.98m,
            Id = id,
            Username = "Carl",
            UserId = Guid.NewGuid()
        };
    
        //ACT
        var content = new StringContent(JsonSerializer.Serialize(highScoreToInsert), Encoding.UTF8, "application/json");
        var postResponse = await httpClient.PostAsync("Highscore", content);
        var numberOfHighscoresAfterPost = dbFixture._context.Highscores.Count();
    
        //ASSERT
        numberOfHighscoresAfterPost.Should().Be(numberOfHighscoresBeforePost + 1);
        postResponse.StatusCode.Should().Be(HttpStatusCode.Created);

        //CLEAN UP
        dbFixture._context.Highscores.Remove(dbFixture._context.Highscores.Where(x => x.Id == id).FirstOrDefault()!);
        await dbFixture._context.SaveChangesAsync();
    }

    [Fact]
    public async Task DatabaseIsAvailableAndCanBeConnectedTo()
    {
        Assert.True(await dbFixture._context.Database.CanConnectAsync());
    }

    [Fact]
    public async Task TestNameAsync()
    {
        
    
        // When
    
        // Then
    }

    private string CreateMockToken()
    {
        var secret = Environment.GetEnvironmentVariable("JWT__Secret");
        var audience = Environment.GetEnvironmentVariable("JWT__ValidAudience");
        var issuer = Environment.GetEnvironmentVariable("JWT__ValidIssuer");

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, "test"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret!));
        var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                expires: DateTime.Now.AddYears(1),
                claims: claims,
                signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256)
                );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    public static Mock<UserManager<IdentityUser>> MockUserManager<IdentityUser>(List<IdentityUser> ls) where IdentityUser : class
    {
        var store = new Mock<IUserStore<IdentityUser>>();
        var mgr = new Mock<UserManager<IdentityUser>>(store.Object, null, null, null, null, null, null, null, null);
        mgr.Object.UserValidators.Add(new UserValidator<IdentityUser>());
        mgr.Object.PasswordValidators.Add(new PasswordValidator<IdentityUser>());

        // mgr.Setup(x => x.DeleteAsync(It.IsAny<IdentityUser>())).ReturnsAsync(IdentityResult.Success);
        mgr.Setup(x => x.CreateAsync(It.IsAny<IdentityUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success).Callback<IdentityUser, string>((x, y) => ls.Add(x));
        // mgr.Setup(x => x.UpdateAsync(It.IsAny<IdentityUser>())).ReturnsAsync(IdentityResult.Success);

        return mgr;
    }

    private List<IdentityUser> _users = new List<IdentityUser>
    {
            new IdentityUser(){
                UserName = "user1",
                Id = "1",
                Email = "user1@bv.com"
            },
            new IdentityUser(){
                UserName = "user2",
                Id = "2",
                Email = "user2@bv.com"
            }
    };
}