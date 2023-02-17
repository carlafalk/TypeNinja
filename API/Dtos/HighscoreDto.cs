namespace API.Dtos;
public class HighscoreDto
{
    public Guid Id { get; set; }
    public string PlayerName { get; set; }
    public int WPM { get; set; }
    public decimal Accuracy { get; set; }
}