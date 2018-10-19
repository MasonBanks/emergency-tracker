import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import firebase from 'firebase';
import { Provider, initialState } from './src/ContextStore';
import Routes from './src/Routes';

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

  setEmergency = (newMode) => {
    this.setState((oldState) => ({
      mode: {
        ...oldState.mode,
        emergency,
      },
    }));
  };

  componentDidMount() {
    database().ref('/site').child('isEmergency').on('value', (snapshot) => {
      this.setState({
        emergencyListener: snapshot.val()
      })
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.emergencyListener !== prevState.emergencyListener) {
      const newMode = this.state.emergencyListener;
      console.log(newMode);
      this.setEmergency(newMode);
    }
  }

  render() {
    return (
      <Provider value={this.state}>
        <Routes />
      </Provider>
    );
  }
}
