import { Box, IconButton } from '@mui/material';
import styles from './Calendar.module.scss';
import CalendarMonth from '../../components/CalendarMonth';
import LeftArrowIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import RightArrowIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useState } from 'react';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const year = date.getFullYear();

  const handleArrowClick = (direction: 'prev' | 'next') => {
    const newDate = new Date(date);
    newDate.setFullYear(direction === 'prev' ? date.getFullYear() - 1 : date.getFullYear() + 1);
    setDate(newDate);
  }

  return (
    <Box className={styles.container}>
      <Box className={styles['year-label-container']}>
        <IconButton disableRipple className={styles['arrow-button']} onClick={() => handleArrowClick('prev')}>
          <LeftArrowIcon className={styles['arrow-icon']} />
        </IconButton>
        <Box className={styles['year-label']}>
          {year}
        </Box>
        <IconButton disableRipple className={styles['arrow-button']} onClick={() => handleArrowClick('next')}>
          <RightArrowIcon className={styles['arrow-icon']} />
        </IconButton>
      </Box>
      <Box className={styles.divider} />
      <Box className={styles['calendar-month-container']}>
        <CalendarMonth year={year} monthNumber={1} monthLabel='January'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={2} monthLabel='February'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={3} monthLabel='March'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={4} monthLabel='April'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={5} monthLabel='May'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={6} monthLabel='June'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={7} monthLabel='July'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={8} monthLabel='August'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={9} monthLabel='September'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={10} monthLabel='October'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={11} monthLabel='November'></CalendarMonth>
        <CalendarMonth year={year} monthNumber={12} monthLabel='December'></CalendarMonth>
      </Box>
    </Box>
  )
};

export default Calendar;