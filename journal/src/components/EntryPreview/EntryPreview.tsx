import { Box, Button, CircularProgress, IconButton, TextField, ThemeProvider, createTheme } from '@mui/material'
import styles from './EntryPreview.module.scss';
import RichTextEditor from '../RichTextEditor';
import { useEffect, useState } from 'react';
import OneSquareIcon from '../../assets/1-square.svg?react';
import TwoSquareIcon from '../../assets/2-square.svg?react';
import ThreeSquareIcon from '../../assets/3-square.svg?react';
import FourSquareIcon from '../../assets/4-square.svg?react';
import FiveSquareIcon from '../../assets/5-square.svg?react';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFormattedDateString, getISOStringLocal, populateDateLabel } from '../../utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getJournalEntryByDate, createJournalEntry, updateJournalEntry, getCurrentWeatherConditions, deleteJournalEntry } from '../../apis';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { AxiosError } from 'axios';
import CharacterCount from '@tiptap/extension-character-count';

const theme = createTheme({
  palette: {
    info: {
      main: '#000000'
    }
  },
});

interface EntryPreivewProps {
  urlDateString: string
}

const EntryPreview = (props: EntryPreivewProps) => {
  const { urlDateString } = props;
  const queryClient = useQueryClient();
  const [subject, setSubject] = useState('');
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const { data: selectedJournalEntryData, isLoading } = useQuery({
    queryKey: ['journalentries', 'date', urlDateString],
    queryFn: ({ queryKey }) => getJournalEntryByDate(queryKey[2]),
    staleTime: Infinity,
    retry: (failureCount, error: AxiosError) => {
      if (error.response?.status === 404) return false;
      if (failureCount > 3) return false;
      return true;
    },
  });

  const { data: weatherData } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getCurrentWeatherConditions('New York'),
    staleTime: 1800000,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CharacterCount
    ],
    editorProps: {
      attributes: {
        class: styles['editor-container'],
      },
    },
    onUpdate: () => {
      setUnsavedChanges(true);
    }
  });

  const createMutation = useMutation({
    mutationFn: createJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalentries'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalentries'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteJournalEntry,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['journalentries', 'date', urlDateString] });
      queryClient.invalidateQueries({ queryKey: ['journalentries'] });
      setSubject('');
      setRating(null);
      if (editor) {
        editor.commands.setContent(null);
      }
    },
  });

  useEffect(() => {
    if (editor) {
      if (selectedJournalEntryData) {
        setSubject(selectedJournalEntryData.subject);
        setRating(selectedJournalEntryData.rating);
        editor.commands.setContent(selectedJournalEntryData.entry_text);
      } else {
        setSubject('');
        setRating(null);
        editor.commands.setContent(null);
      }
      setUnsavedChanges(false);
    }
  }, [selectedJournalEntryData, editor]);

  const getButtonText = () => {
    return !selectedJournalEntryData ? 'Create' : 'Update';
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.container}>
        <Box className={styles['entry-date']}>
          {populateDateLabel(urlDateString ?? new Date().toString())}
        </Box>
        <Box className={styles.header}>
          <TextField
            id="standard-basic"
            placeholder='Title'
            variant="standard"
            color="info"
            fullWidth
            hiddenLabel
            value={subject}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSubject(event.target.value);
            }}
            sx={{ justifyContent: 'end' }}
          />
          <Box className={styles.rating}>
            <IconButton
              onClick={() => setRating(rating === 1 ? null : 1)}
              name="one-rating"
              disableFocusRipple
              disableRipple
            >
              <OneSquareIcon className={[styles.icon, styles['one-rating'], rating === 1 ? styles.selected : ''].join(' ')} />
            </IconButton>
            <IconButton
              onClick={() => setRating(rating === 2 ? null : 2)}
              name="two-rating"
              disableFocusRipple
              disableRipple
            >
              <TwoSquareIcon className={[styles.icon, styles['two-rating'], rating === 2 ? styles.selected : ''].join(' ')} />
            </IconButton>
            <IconButton
              onClick={() => setRating(rating === 3 ? null : 3)}
              name="three-rating"
              disableFocusRipple
              disableRipple
            >
              <ThreeSquareIcon className={[styles.icon, styles['three-rating'], rating === 3 ? styles.selected : ''].join(' ')} />
            </IconButton>
            <IconButton
              onClick={() => setRating(rating === 4 ? null : 4)}
              name="four-rating"
              disableFocusRipple
              disableRipple
            >
              <FourSquareIcon className={[styles.icon, styles['four-rating'], rating === 4 ? styles.selected : ''].join(' ')} />
            </IconButton>
            <IconButton
              onClick={() => setRating(rating === 5 ? null : 5)}
              name="five-rating"
              disableFocusRipple
              disableRipple
            >
              <FiveSquareIcon className={[styles.icon, styles['five-rating'], rating === 5 ? styles.selected : ''].join(' ')} />
            </IconButton>
          </Box>
        </Box>
        <RichTextEditor editor={editor} isLoading={isLoading} unsavedChanged={unsavedChanges} />
        <Box className={styles.footer}>
          <Button
            disableFocusRipple
            variant="outlined"
            className={styles['submit-button']}
            disabled={!rating || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending}
            onClick={() => {
              if (!rating) return;
              if (selectedJournalEntryData) {
                updateMutation.mutate({
                  ...selectedJournalEntryData,
                  subject,
                  rating,
                  entry_text: editor?.getHTML() ?? "",
                  last_updated_date: getISOStringLocal(new Date().toString())
                })
              } else {
                const currentDateISOString = getISOStringLocal(new Date().toString());
                const currentDateFormattedString = getFormattedDateString(new Date().toString());
                const entryDateFormattedString = getFormattedDateString(urlDateString);
                createMutation.mutate({
                  subject,
                  rating,
                  entry_text: editor?.getHTML() ?? "",
                  entry_date: entryDateFormattedString,
                  created_date: currentDateISOString,
                  last_updated_date: currentDateISOString,
                  weather_description: currentDateFormattedString === entryDateFormattedString ? weatherData?.weather_description : undefined,
                  weather_code: currentDateFormattedString === entryDateFormattedString ? weatherData?.weather_code : undefined
                })
              }
              setUnsavedChanges(false);
            }}>
            {createMutation.isPending || updateMutation.isPending ? <CircularProgress size="1.75em" /> : getButtonText()}
          </Button>
          <IconButton
            disableFocusRipple
            disabled={!selectedJournalEntryData || deleteMutation.isPending }
            color="error"
            className={styles['delete-button']}
            onClick={() => {
              if (selectedJournalEntryData) {
                deleteMutation.mutate(selectedJournalEntryData);
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default EntryPreview;