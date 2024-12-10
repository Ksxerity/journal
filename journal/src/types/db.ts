export interface JournalEntryBody {
  subject: string,
  rating: 1 | 2 | 3 | 4 | 5,
  entry_text: string,
  entry_date: string,
  created_date: string,
  last_updated_date: string,
  weather_description?: string,
  weather_code?: number
}

export interface JournalEntry extends JournalEntryBody {
  id: number,
}