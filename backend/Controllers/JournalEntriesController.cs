using Microsoft.AspNetCore.Mvc;
using MyWebApiProject.Models;
using MyWebApiProject.Services;

namespace MyWebApiProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JournalEntriesController(JournalEntryService journalEntryService) : ControllerBase
    {
        private readonly JournalEntryService _journalEntryService = journalEntryService;

        [HttpPost]
        public IActionResult CreateJournalEntry([FromBody] JournalEntry journalEntry)
        {
            _journalEntryService.AddJournalEntry(journalEntry);
            return CreatedAtAction(nameof(GetJournalEntryByDate), new { date = journalEntry.Entry_date }, journalEntry);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJournalEntry(int id, [FromBody] JournalEntry journalEntry)
        {
            if (id != journalEntry.Id)
            {
                return BadRequest("ID in URL does not match ID in body.");
            }

            var result = await _journalEntryService.UpdateJournalEntry(journalEntry);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet("{date}")]
        public IActionResult GetJournalEntryByDate(string date)
        {
            var journalEntry = _journalEntryService.GetJournalEntryByDate(date);
            if (journalEntry == null)
            {
                return NotFound();
            }
            return Ok(journalEntry);
        }

        [HttpGet("year/{year}")]
        public async Task<IActionResult> GetJournalEntriesByYear(int year)
        {
            var journalEntries = await _journalEntryService.GetJournalEntriesByYearAsync(year);
            return Ok(journalEntries);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllJournalEntries()
        {
            var journalEntries = await _journalEntryService.GetAllJournalEntriesAsync();
            return Ok(journalEntries);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJournalEntry(int id)
        {
            var result = await _journalEntryService.DeleteJournalEntry(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
