using Microsoft.EntityFrameworkCore;
using MyWebApiProject.Data;
using MyWebApiProject.Models;

namespace MyWebApiProject.Services
{
    public class JournalEntryService(ApplicationDbContext context)
    {
        private readonly ApplicationDbContext _context = context;

        public void AddJournalEntry(JournalEntry journalEntry)
        {
            _context.JournalEntries.Add(journalEntry);
            _context.SaveChanges();
        }

        public async Task<bool> UpdateJournalEntry(JournalEntry journalEntry)
        {
            var existingEntry = _context.JournalEntries.FirstOrDefault(entry => entry.Id == journalEntry.Id);
            if (existingEntry == null)
            {
                return false;
            }

            existingEntry.Subject = journalEntry.Subject;
            existingEntry.Rating = journalEntry.Rating;
            existingEntry.Entry_text = journalEntry.Entry_text;
            existingEntry.Last_updated_date = journalEntry.Last_updated_date;

            _context.JournalEntries.Update(existingEntry);
            await _context.SaveChangesAsync();

            return true;
        }

        public JournalEntry? GetJournalEntryByDate(string date)
        {
            var queryDate = DateTime.Parse(date).Date;
            return _context.JournalEntries.FirstOrDefault(entry => queryDate.Equals(entry.Entry_date.Date));
        }


        public async Task<JournalEntry[]> GetJournalEntriesByYearAsync(int? year)
        {
            if (_context.JournalEntries == null)
            {
                return [];
            }

            if (year.HasValue)
            {
                return await _context.JournalEntries
                .Where(je => je.Entry_date.Year == year)
                .OrderBy(je => je.Entry_date)
                .ToArrayAsync();
            }

            return await _context.JournalEntries.ToArrayAsync();
        }

        public async Task<JournalEntry[]> GetAllJournalEntriesAsync()
        {
            if (_context.JournalEntries == null)
            {
                return [];
            }

            return await _context.JournalEntries.ToArrayAsync();
        }
    }
}

