import { Box, Button } from '@mui/material';
import styles from './CalendarMonth.module.scss';
import { useNavigate } from 'react-router-dom';
import { getNumberOfDaysInMonth } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { getJournalEntriesByYear } from '../../apis';

interface CalendarMonthProps {
  year: number,
  monthNumber: number,
  monthLabel: string
}
const CalendarMonth = (props: CalendarMonthProps) => {
  const { year, monthNumber, monthLabel } = props;
  const navigate = useNavigate();
  const yearMonthString = `${year}-${monthNumber}`
  const firstDayOfMonthDate = new Date(`${yearMonthString}-01`);

  const { data: yearData } = useQuery({
    queryKey: ['journalentries', 'year', year],
    queryFn: ({ queryKey }) => getJournalEntriesByYear(queryKey[2] as number),
    staleTime: Infinity,
  });

  const createDayOfWeekLabels = () => {
    return ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayOfWeek, index) => {
      return (
        <Box
          key={`${dayOfWeek}-${index}-label`}
          className={styles['day-of-week-label']}
        >
          {dayOfWeek}
        </Box>
      )
    })
  };

  const getEntryFromDay = (day: number) => {
    const getRatingSelector = (rating: number | undefined) => {
      switch (rating) {
        case 1:
          return 'one-rating';
        case 2:
          return 'two-rating';
        case 3:
          return 'three-rating';
        case 4:
          return 'four-rating';
        case 5:
          return 'five-rating';
        default:
          return '';
      }
    };
    const targetJournalEntry = yearData?.find((journalEntry) => {
      const journalEntryDate = new Date(journalEntry.entry_date);
      return journalEntryDate.getMonth() + 1 === monthNumber && journalEntryDate.getDate() === day;
    });
    return getRatingSelector(targetJournalEntry?.rating);
  };

  const isFutureDate = (day: number) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const targetDate = new Date(`${yearMonthString}-${day}`);
    return targetDate > currentDate;
  }

  const createDayElementsArray = () => {
    const weekArray: JSX.Element[][] = [[]];
    const numberOfDaysInMonth = getNumberOfDaysInMonth(firstDayOfMonthDate);
    const startingIndexForMonth = firstDayOfMonthDate.getDay();
    let dayIndex = 0;
    for (let i = startingIndexForMonth; i < 7; i += 1) {
      const day = dayIndex + 1;
      weekArray[0].push(
        <Button
          variant='text'
          disabled={isFutureDate(day)}
          key={`${yearMonthString}-${day}`}
          onClick={() => navigate(`/calendar/${yearMonthString}-${day}`)}
          className={[styles['dates-of-week'], styles[getEntryFromDay(day)]].join(' ')}
          sx={{ gridColumnStart: i + 1 }}
        >
          {day}
        </Button>
      );
      dayIndex += 1;
    }
    weekArray.push([]);
    let weekArrayIndex = 1;

    for (let i = dayIndex; i < numberOfDaysInMonth; i += 1) {
      const day = i + 1;
      if (weekArray[weekArrayIndex].length === 7) {
        weekArray.push([]);
        weekArrayIndex += 1;
      }
      weekArray[weekArrayIndex].push(
        <Button
          variant='text'
          disabled={isFutureDate(day)}
          key={`${yearMonthString}-${day}`}
          onClick={() => navigate(`/calendar/${yearMonthString}-${day}`)}
          className={[styles['dates-of-week'], styles[getEntryFromDay(day)]].join(' ')}
        >
          {day}
        </Button>
      );
    }
    return weekArray;
  }

  return (
    <Box className={styles.container}>
      <Box className={styles['month-label']}>
        {monthLabel}
      </Box>
      <Box className={styles['dates-grid']}>
        {createDayOfWeekLabels()}
        {createDayElementsArray()}
      </Box>
    </Box>
  )
};

export default CalendarMonth;