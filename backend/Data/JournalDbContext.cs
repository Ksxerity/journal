using Microsoft.EntityFrameworkCore;
using MyWebApiProject.Models;

namespace MyWebApiProject.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Add DbSet for each entity
        public DbSet<JournalEntry> JournalEntries { get; set; }
    }
}
