import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// A custom theme for this app
export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#4E7F97',
    },
    secondary: {
      main: red[500],
    },
    error: {
      main: red[500],
    },
    background: {
      default: '#A60303',
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        color: '#4E7F97',
        borderColor: '#4E7F97',
      },
    },
  },
}) as ThemeOptions
