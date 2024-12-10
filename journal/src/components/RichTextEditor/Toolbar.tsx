import { Box, ThemeProvider, ToggleButton, ToggleButtonGroup, createTheme } from '@mui/material';
import { Editor } from '@tiptap/react';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
import StrikethroughSOutlinedIcon from '@mui/icons-material/StrikethroughSOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import HeadingOne from '../../assets/heading1.svg?react';
import HeadingTwo from '../../assets/heading2.svg?react';
import HeadingThree from '../../assets/heading3.svg?react';
import styles from './Toolbar.module.scss';

const theme = createTheme({
  components: {
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          paddingRight: '5px'
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.32)'
        }
      }
    }
  }
});

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar = (props: ToolbarProps) => {
  const { editor } = props;

  if (!editor) {
    return null
  }

  return (
    <Box className={styles.container}>
      <ThemeProvider theme={theme}>
        <ToggleButtonGroup
          size="small"
        >
          <ToggleButton
            value="bold"
            disableRipple
            onClick={() => editor.chain().focus().toggleBold().run()}
            selected={editor.isActive('bold')}
            sx={{ borderColor: 'rgba(0, 0, 0, 0.32)' }}
          >
            <FormatBoldOutlinedIcon />
          </ToggleButton>
          <ToggleButton
            value="italic"
            disableRipple
            onClick={() => editor.chain().focus().toggleItalic().run()}
            selected={editor.isActive('italic')}
          >
            <FormatItalicOutlinedIcon />
          </ToggleButton>
          <ToggleButton
            value="strike"
            disableRipple
            onClick={() => editor.chain().focus().toggleStrike().run()}
            selected={editor.isActive('strike')}
          >
            <StrikethroughSOutlinedIcon />
          </ToggleButton>
          <ToggleButton
            value="underline"
            disableRipple
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            selected={editor.isActive('underline')}
          >
            <FormatUnderlinedOutlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="small"
        >
          <ToggleButton
            value="orderedList"
            disableRipple
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            selected={editor.isActive('orderedList')}
          >
            <FormatListNumberedOutlinedIcon />
          </ToggleButton>
          <ToggleButton
            value="bulletList"
            disableRipple
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            selected={editor.isActive('bulletList')}
          >
            <FormatListBulletedOutlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="small"
        >
          <ToggleButton
            value="horizontalRule"
            disableRipple
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <HorizontalRuleOutlinedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="small"
        >
          <ToggleButton
            value="headingOne"
            disableRipple
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <HeadingOne />
          </ToggleButton>
          <ToggleButton
            value="headingTwo"
            disableRipple
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <HeadingTwo />
          </ToggleButton>
          <ToggleButton
            value="headingThree"
            disableRipple
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <HeadingThree />
          </ToggleButton>
        </ToggleButtonGroup>
      </ThemeProvider>
      {/* 
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
      >
        purple
      </button> */}
    </Box>
  )
}

export default Toolbar;