import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
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
        <MuiThemeProvider thme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Trainee} />
              <AuthRoute path="/login" component={Login} />
              <PrivateRoute exact path="/Input" component={InputDemo} />
              <PrivateRoute exact path="/Children" component={ChildrenDemo} />
              <PrivateRoute exact path="/Text" component={TextFieldDemo} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
