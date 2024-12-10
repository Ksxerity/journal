import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import styles from './StatisticsPreview.module.scss';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllJournalEntries, getJournalEntriesByYear } from '../../apis';
import { JournalEntry } from '../../types';

interface StatisticsPreviewProps {
  dateString: string
}

const StatisticsPreview = (props: StatisticsPreviewProps) => {
  const { dateString } = props;
  const [statType, setStatType] = useState('year');
  const [yearStats, setYearStats] = useState({
    entries: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  });
  const [totalStats, setTotalStats] = useState({
    entries: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  });

  const { data: yearData } = useQuery({
    queryKey: ['journalentries', 'year', new Date(dateString).getFullYear()],
    queryFn: ({ queryKey }) => getJournalEntriesByYear(queryKey[2] as number),
    staleTime: Infinity,
  });

  const { data: allData } = useQuery({
    queryKey: ['journalentries', 'all'],
    queryFn: getAllJournalEntries,
    staleTime: Infinity,
  });

  useEffect(() => {
    const calculateStatistics = (journalEntries: JournalEntry[]) => {
      const totals = {
        entries: journalEntries.length,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
      };
      journalEntries.forEach((journalEntry) => {
        switch (journalEntry.rating) {
          case 1:
            totals.one = totals.one + 1;
            break;
          case 2:
            totals.two = totals.two + 1;
            break;
          case 3:
            totals.three = totals.three + 1;
            break;
          case 4:
            totals.four = totals.four + 1;
            break;
          default:
            totals.five = totals.five + 1;
        }
      });
      return totals;
    }
    if (yearData) {
      const stats = calculateStatistics(yearData);
      setYearStats(stats);
    }
    if (allData) {
      const stats = calculateStatistics(allData);
      setTotalStats(stats);
    }
  }, [yearData, allData])

  return (
    <Box className={styles.container}>
      <ToggleButtonGroup
        value={statType}
        exclusive
        onChange={(
          _event: React.MouseEvent<HTMLElement>,
          newValue: string | null,
        ) => {
          if (newValue) {
            setStatType(newValue);
          }
        }}
      >
        <ToggleButton
          disableRipple
          value="year"
          fullWidth
          sx={{ borderColor: 'rgba(0, 0, 0, 0.32)' }}
        >
          Year
        </ToggleButton>
        <ToggleButton
          disableRipple
          value="total"
          fullWidth
          sx={{ borderColor: 'rgba(0, 0, 0, 0.32)' }}
        >
          Total
        </ToggleButton>
      </ToggleButtonGroup>
      <Box className={styles['grid-container']}>
        <Box className={[styles['stat-container'], styles['entries-stat']].join(' ')}>
          <Box className={styles['stat-title']}>
            Entries
          </Box>
          <Box className={styles['stat-value']}>
            {statType === 'year' ? yearStats.entries : totalStats.entries}
          </Box>
        </Box>
        <Box className={[styles['stat-container'], styles['one-rating']].join(' ')}>
          <Box className={styles['stat-title']}>
            One
          </Box>
          <Box className={styles['stat-value']}>
            {statType === 'year' ? yearStats.one : totalStats.one}
          </Box>
        </Box>
        <Box className={[styles['stat-container'], styles['two-rating']].join(' ')}>
          <Box className={styles['stat-title']}>
            Two
          </Box>
          <Box className={styles['stat-value']}>
            {statType === 'year' ? yearStats.two : totalStats.two}
          </Box>
        </Box>
        <Box className={[styles['stat-container'], styles['three-rating']].join(' ')}>
          <Box className={styles['stat-title']}>
            Three
          </Box>
          <Box className={styles['stat-value']}>
            {statType === 'year' ? yearStats.three : totalStats.three}
          </Box>
        </Box>
        <Box className={[styles['stat-container'], styles['four-rating']].join(' ')}>
          <Box className={styles['stat-title']}>
            Four
          </Box>
          <Box className={styles['stat-value']}>
            {statType === 'year' ? yearStats.four : totalStats.four}
          </Box>
        </Box>
        <Box className={[styles['stat-container'], styles['five-rating']].join(' ')}>
          <Box className={styles['stat-title']}>
            Five
          </Box>
          <Box className={styles['stat-value']}>
            {statType === 'year' ? yearStats.five : totalStats.five}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StatisticsPreview;