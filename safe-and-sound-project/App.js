import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import firebase from 'firebase';
import { config } from './config/firebase-config';
import { Provider, initialState } from './src/ContextStore';
import Routes from './src/Routes';

// firebase.initializeApp(config);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      setAuth: this.setAuth,
      setMode: this.setMode
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

  render() {
    return (
      <Provider value={this.state}>
        <Routes />
      </Provider>
    );
  }
}
