import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import axios from 'axios';
import firebase from 'firebase';
import { GlobalProvider } from './src/ContextStore/GlobalContext';
import Routes from './src/Routes';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import * as api from './api';
import inside from 'point-in-polygon';
// import apiUrl from './config/config';
// const TEST_ENDPOINT = `${apiUrl}/users/test`;

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
      dbEmergencyStatus: true,
      inSafeZone: false,
      inBuilding: false,

      latitude: 0,
      longitude: 0,
      user: ''
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {

    database().ref('site').child('isEmergency').on('value', (snapshot) => {
      console.log(`DB connected: Site status: ${snapshot.val() ? 'Emergency' : 'IDLE'}`)
      this.setState({
        dbEmergencyStatus: snapshot.val(),
        inSafeZone: false,
        inBuilding: false,
        latitude: '',
        latitude: '',
        user: '',

      })
    });

    const build = this.getBuilding();
    const safe = this.getSafeZone();
    Promise.all([build, safe]).then(([building, safezone]) => {
      let mappedBuilding = building.map(coordinate => {
        return [coordinate.longitude, coordinate.latitude];
      });

      let mappedSafeZone = safezone.map(coordinate => {
        return [coordinate.longitude, coordinate.latitude];
      });
      this.interval = setInterval(() => {
        this.checkLocation(mappedBuilding, mappedSafeZone);
      }, 10000);
    });
  }

  checkLocation = (mappedBuilding, mappedSafeZone) => {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    const { latitude, longitude } = this.state;

    navigator.geolocation.watchPosition(
      position => {
        this.setState(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          () => {
            if (
              inside([longitude, latitude], mappedBuilding) &&
              this.state.user
            ) {
              api.userInBuilding(this.state.user);
            } else if (
              !inside([longitude, latitude], mappedBuilding) &&
              this.state.user
            ) {
              api.userExitBuilding(this.state.user);
            }
            if (
              inside([longitude, latitude], mappedSafeZone) &&
              this.state.user
            ) {
              api.userInSafeZone(this.state.user);
            } else if (
              !inside([longitude, latitude], mappedSafeZone) &&
              this.state.user
            ) {
              api.userExitSafeZone(this.state.user);
            }
          }
        );
      },
      error => alert(error.message),
      options
    );
  };

  getUserId = userId => {
    this.setState({
      user: userId
    });
  };

  getSafeZone = () => api.getSafeZone().then(data => data.val());

  getBuilding = () => api.getBuilding().then(data => data.val());

  render() {
    return (
      <GlobalProvider appState={this.state} getUserId={this.getUserId}>
        <Routes />
      </GlobalProvider>
    );
  }
}
