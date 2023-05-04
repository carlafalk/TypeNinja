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

namespace Test.Fixture.WebAppFactory;

public class IntegrationTests : IClassFixture<WebApplicationFactory<Program>>, IClassFixture<DbFixture>
{
    private readonly HttpClient? httpClient;
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
        var httpResponseMessage = await httpClient.GetAsync("Highscore");
        var responseBody = await httpResponseMessage.Content.ReadAsStringAsync();
        var nrOfHighscores = JsonSerializer.Deserialize<List<HighscoreDto>>(responseBody);

        // ACT
        var highScoreToInsert = new Highscore(){
            WPM = 30,
            Accuracy = 0.98m,
            Id = Guid.NewGuid()
        };
        var insertedHighscore = dbFixture.context.Highscores.Add(highScoreToInsert).Entity;
        await dbFixture.context.SaveChangesAsync();

        httpResponseMessage = await httpClient.GetAsync("Highscore");
        responseBody = await httpResponseMessage.Content.ReadAsStringAsync();
        var nrOfHighscoresAfterInsert = JsonSerializer.Deserialize<List<HighscoreDto>>(responseBody, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase })!;

        // ASSERT
        nrOfHighscores.Count.Should().Be(nrOfHighscoresAfterInsert.Count - 1);
        httpResponseMessage.StatusCode.Should().Be(HttpStatusCode.OK);

        // CLEAN UP
        dbFixture.context.Highscores.Remove(insertedHighscore);
        await dbFixture.context.SaveChangesAsync();
    }

    [Fact]
    public async Task DatabaseIsAvailableAndCanBeConnectedTo()
    {
        Assert.True(await dbFixture.context.Database.CanConnectAsync());
    }

    private string CreateMockToken()
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, "test"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("JWTAuthenticationHIGHsecuredPasswordVVVp1OH7Xzyr"));
        var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:4200",
                expires: DateTime.Now.AddYears(1),
                claims: claims,
                signingCredentials: new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256)
                );

        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }
}