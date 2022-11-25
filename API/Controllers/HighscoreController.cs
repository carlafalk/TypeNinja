using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AppCore.Entities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;


[ApiController]
[Route("[controller]")]

public class HighscoreController : ControllerBase
{
    private readonly Context context;

    public HighscoreController(Context _context)
    {
        context = _context;
    }

    [HttpPost]
    public async Task<ActionResult<Highscore>> PostHighscoreAsync(Highscore highscore)
    {
        context.Highscores.Add(highscore);
        await context.SaveChangesAsync();

        return Ok(highscore);
    }

    [HttpGet]
    public async Task<ActionResult<Highscore>> GetAllHighscoresAsync()
    {
        List<Highscore> persons = await context.Highscores.ToListAsync();
        return Ok(persons);
    }
}