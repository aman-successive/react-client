import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackBarProvider } from './contexts';
import {
  NoMatch, Login, Trainee, InputDemo, ChildrenDemo, TextFieldDemo,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes';
import theme from './theme';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <SnackBarProvider>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/trainee" />
                </Route>
                <PrivateRoute path="/trainee" component={Trainee} />
                <AuthRoute path="/login" component={Login} />
                <PrivateRoute path="/Input" component={InputDemo} />
                <PrivateRoute path="/Children" component={ChildrenDemo} />
                <PrivateRoute path="/Text" component={TextFieldDemo} />
                <Route component={NoMatch} />
              </Switch>
            </Router>
          </MuiThemeProvider>
        </SnackBarProvider>
      </>
    );
  }
}

export default App;
