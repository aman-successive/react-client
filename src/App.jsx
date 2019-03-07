import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Trainee, Login } from './pages';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import { Typography } from '@material-ui/core';
// import { ChildrenDemo } from './pages';
// import theme from './theme';

const App = () => (
  <>
    {/* <InputDemo /> */}
    {/* <MuiThemeProvider theme={theme}>
      <Typography>
        <ChildrenDemo />
      </Typography>
    </MuiThemeProvider> */}
    {/* <Trainee /> */}
    <React.Fragment>
      <CssBaseline />
      <Trainee />
      <Login />
    </React.Fragment>
  </>
);
export default App;
