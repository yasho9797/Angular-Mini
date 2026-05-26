namespace EventIdeasApi
{
    public class Idea
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string ActivityType { get; set; } = string.Empty;
        public string TargetAudience { get; set; } = string.Empty;
        public int Duration { get; set; }
        public string Status { get; set; } = "ממתין לאישור"; // ברירת מחדל
    }
}