namespace API.Dtos;
public class HighscoreDto
{
    public string UserId { get; set; }
    public string Username { get; set; }
    public int WPM { get; set; }
    public decimal Accuracy { get; set; }
}