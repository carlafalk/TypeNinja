using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AppCore.Entities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;


[ApiController]
[Route("[controller]")]

public class UserController : ControllerBase
{
    private readonly Context context;

    public UserController(Context _context)
    {
        context = _context;
    }

    [HttpPost]
    public async Task<ActionResult<User>> PostUserAsync(User user)
    {
        context.Users.Add(user);
        await context.SaveChangesAsync();

        return Ok(user);
    }

    [HttpGet]
    public async Task<ActionResult<User>> GetAllUsersAsync()
    {
        List<User> users = await context.Users.ToListAsync();
        return Ok(users);
    }
}