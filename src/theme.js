import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Comic Sans MS"',
      'cursive',
      'sans-serif',
    ].join(','),
    htmlFontSize: 10,
  },
});
export default theme;
