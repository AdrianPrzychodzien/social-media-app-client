import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

// Components
import NavBar from './components/NavBar'

// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true
  },
  styles: {
    form: {
      textAlign: 'center'
    },
    image: {
      margin: '20px auto'
    },
    pageTitle: {
      margin: '10px auto'
    },
    textField: {
      margin: '10px auto'
    },
    button: {
      marginTop: 20,
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    progress: {
      position: 'absolute'
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <Router>
              <NavBar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home} />
                  <Route exact path="/login" component={login} />
                  <Route exact path="/signup" component={signup} />
                </Switch>
              </div>
            </Router>
          </header>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
