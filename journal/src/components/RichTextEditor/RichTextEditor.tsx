import { Editor, EditorContent } from '@tiptap/react';
import { Box, CircularProgress } from '@mui/material';
import Toolbar from './Toolbar';
import styles from './RichTextEditor.module.scss';

interface EditorProps {
  editor: Editor | null,
  isLoading: boolean,
  unsavedChanged: boolean
}

const RichTextEditor = (props: EditorProps) => {
  const { editor, isLoading, unsavedChanged } = props;

  return (
    <Box>
      <Box className={styles['toolbar-container']}>
        <Toolbar editor={editor} />
        <Box className={styles['character-count-and-status-container']}>
          {editor?.storage.characterCount.words()}
          <Box className={[styles['unsaved-changes'], unsavedChanged ? styles['yellow-marker'] : styles['green-marker']].join(' ')} />
        </Box>
      </Box>
      {isLoading ?
        <Box className={styles['loading-container']}>
          <CircularProgress />
        </Box>
        : <EditorContent editor={editor} />}
    </Box >
  )
}

export default RichTextEditor;