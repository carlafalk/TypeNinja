using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AppCore.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using API.Dtos;
using AppCore.Infrastructure;

namespace API.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]

public class HighscoreController : ControllerBase
{
    private readonly Context _context;
    private readonly UserManager<IdentityUser> _userManager;

    public HighscoreController(Context context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpPost]
    public async Task<ActionResult<Highscore>> PostHighscoreAsync([FromBody] Highscore highscore)
    {
        try
        {   
        _context.Highscores.Add(highscore);
        await _context.SaveChangesAsync();
        }
        catch (Exception exeption)
        {
            throw new Exception(exeption.Message);
        }

        return StatusCode(201, highscore);
    }

    [HttpGet]
    public async Task<ActionResult<List<HighscoreDto>>> GetAllHighscoresAsync()
    {
        List<HighscoreDto> highscores = new();
        List<HighscoreDto> orderedHighscoreList = new();
        var highscoreContext = await _context.Highscores.ToListAsync();
        
        try
        {
            foreach (var highscore in highscoreContext)
            {
                var user = await _userManager.FindByIdAsync(highscore.UserId.ToString());
                if(user == null){
                    Console.WriteLine("user not found");
                }

                HighscoreDto highscoreDto = new(){
                    UserId = user?.Id,
                    Id = highscore.Id,
                    PlayerName = user?.UserName,
                    WPM = highscore.WPM,
                    Accuracy = highscore.Accuracy
                };

                highscores.Add(highscoreDto);
            }
            orderedHighscoreList.AddRange(highscores
                                .OrderByDescending((higscore) => higscore.WPM)
                                .ThenByDescending((highscore) => highscore.Accuracy)
                                .ToList());
        }
        catch (Exception exeption)
        {
            throw new Exception(exeption.Message);
        }
        return Ok(orderedHighscoreList);
    }
}