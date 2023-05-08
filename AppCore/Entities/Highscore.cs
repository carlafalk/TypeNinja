namespace AppCore.Entities;
public class Highscore{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Username { get; set; }
    public int WPM { get; set; }
    public decimal Accuracy { get; set; }
}