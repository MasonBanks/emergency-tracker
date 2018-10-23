import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import firebase from 'firebase';
import { GlobalProvider } from './src/ContextStore/globalContext';
import Routes from './src/Routes';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']); // makes app ignore yellow warnings
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
      dbEmergencyStatus: {},
      update: {}
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

  handleEmergencyStatusChange(status) {
    return this.setMode(status)
  }

  render() {
    return (
      <GlobalProvider>
        <Routes handleEmergencyStatusChange={() => { this.handleEmergencyStatusChange(this.state.dbEmergencyStatus) }} />
      </GlobalProvider>
    )
  }
}
