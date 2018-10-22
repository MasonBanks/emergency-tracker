import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import firebase from 'firebase';
import { AuthProvider } from './src/ContextStore/AuthContext';
import { ModeProvider, ModeContext } from './src/ContextStore/ModeContext';
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
    state = {
      dbEmergencyStatus: false
    }
  }

  componentDidMount() {
    database().ref('site').child('isEmergency').on('value', (snapshot) => {
      console.log(`DB connected: Site status: ${snapshot.val() ? 'Emergency' : 'IDLE'}`)
      this.setState({
        dbEmergencyStatus: snapshot.val()
      })
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   switch (newStatus) {
  //     case prevState === null: this.state.dbEmergencyStatus;
  //     case prevState === false: this.state.dbEmergencyStatus;
  //     case prevState === true: this.state.dbEmergencyStatus;
  //   }
  // }

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
