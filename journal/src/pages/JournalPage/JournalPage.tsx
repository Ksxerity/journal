import styles from './JournalPage.module.scss';
import { Box, IconButton } from '@mui/material';
import EntryPreview from '../../components/EntryPreview';
import StatisticsPreview from '../../components/StatisticsPreview';
import { weatherIconCodeMapping } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { getCurrentWeatherConditions } from '../../apis';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CalendarWeekIcon from '../../assets/calendar2-week.svg?react';
import CalendarDateIcon from '../../assets/calendar2-date.svg?react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const JournalPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getCurrentWeatherConditions('Seoul'),
    staleTime: 1800000,
  });

  const currentDate = new Date();
  const currentDayNumber = currentDate.getDate();
  const currentDayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
  const currentMonthAndYear = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const renderSvg = useMemo(() => {
    if (data) {
      const code = `${data.weather_code}` as keyof typeof weatherIconCodeMapping;
      const SvgComponent = data.is_day ? weatherIconCodeMapping[code].day : weatherIconCodeMapping[code].night;
      return <SvgComponent className={styles.icon} />
    }
    return null;
  }, [data])

  const isEntryDateCurrentDate = () => {
    if (!date) return true;
    const entryDate = new Date(date);
    if (entryDate.getFullYear() === currentDate.getFullYear() &&
      entryDate.getMonth() === currentDate.getMonth() &&
      entryDate.getDate() === currentDate.getDate()) {
      return true;
    }
    return false;
  }

  return (
    <Box className={styles.home}>
      <Box className={styles['left-side-container']}>
        <Box className={styles['date-with-weather']}>
          <Box className={styles['date-number']}>
            {currentDayNumber}
            {renderSvg}
          </Box>
          <Box className={styles['date-text-container']}>
            <Box className={styles['date-day']}>
              {currentDayOfWeek}
            </Box>
            <Box className={styles['date-month-year']}>
              {currentMonthAndYear}
            </Box>
          </Box>
        </Box>
        <Box className={styles['first-divider']} />
        <Box className={styles['navigation-buttons']}>
          <IconButton disableRipple className={styles['calendar-button']}>
            <ArrowBackIcon className={styles['calendar-icon']} onClick={() => {
              const entryDate = new Date(date ?? currentDate);
              entryDate.setDate(entryDate.getDate() - 1);
              navigate(`/calendar/${entryDate.getFullYear()}-${entryDate.getMonth() + 1}-${entryDate.getDate()}`)
            }} />
          </IconButton>
          <IconButton disableRipple className={styles['calendar-button']}>
            <CalendarWeekIcon className={styles['calendar-icon']} onClick={() => navigate('/calendar')} />
          </IconButton>
          <IconButton disableRipple className={styles['calendar-button']}>
            <CalendarDateIcon className={styles['calendar-icon']} onClick={() => navigate('/')} />
          </IconButton>
          <IconButton disableRipple disabled={isEntryDateCurrentDate()} className={styles['calendar-button']}>
            <ArrowForwardIcon className={styles['calendar-icon']} onClick={() => {
              const entryDate = new Date(date ?? currentDate);
              entryDate.setDate(entryDate.getDate() + 1);
              navigate(`/calendar/${entryDate.getFullYear()}-${entryDate.getMonth() + 1}-${entryDate.getDate()}`)
            }} />
          </IconButton>
        </Box>
        <Box className={styles['second-divider']} />
        <StatisticsPreview dateString={date ?? currentDate.toString()}></StatisticsPreview>
      </Box>
      <EntryPreview urlDateString={date ?? currentDate.toString()}></EntryPreview>
    </Box>
  );
};

export default JournalPage;
