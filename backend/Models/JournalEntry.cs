using System.ComponentModel.DataAnnotations.Schema;

namespace MyWebApiProject.Models
{
    [Table("journal_entries")]
    // [Table("journal_entries_dev")]
    public class JournalEntry
    {
        public int Id { get; set; }
        public required string Subject { get; set; }
        public required int Rating { get; set; }
        public required string Entry_text { get; set; }
        public required DateTime Entry_date { get; set; }
        public required DateTime Created_date { get; set; }
        public required DateTime Last_updated_date { get; set; }
        public string? Weather_description { get; set; }
        public int? Weather_code { get; set; }
    }
}