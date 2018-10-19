import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import firebase from 'firebase';
import { AuthProvider } from './src/ContextStore/authContext';
import { ModeProvider } from './src/ContextStore/modeContext';
import { initialState } from './src/ContextStore/initialState';
import Routes from './src/Routes';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const { database } = firebase;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      setAuth: this.setAuth
    };
  }

  setAuth = (authenticated) => {
    this.setState((oldState) => ({
      auth: {
        ...oldState.auth,
        authenticated,
      },
    }));
  };

  setMode = (emergency) => {
    this.setState((oldState) => ({
      mode: {
        ...oldState.mode,
        emergency,
      },
    }));
  };

  componentDidMount() {
    database().ref('/site').child('isEmergency').on('value', (snapshot) => {
      console.log(snapshot, '<<<<<<<<<')
    });
  }

  render() {
    return (
      <AuthProvider>
        <ModeProvider>
          <Routes />
        </ModeProvider>
      </AuthProvider>
    )
  }
}
