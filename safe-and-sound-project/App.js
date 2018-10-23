import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import firebase from 'firebase';
import { GlobalProvider } from './src/ContextStore/globalContext';
import Routes from './src/Routes';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import * as api from './api';
import inside from 'point-in-polygon';

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
      latitude: 53.483959,
      longitude:-2.244644,
      user:'fffffffff',
    }
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
        // latitude: 53.483959,
        // longitude:-2.244644,
        user:'',
      })
    });

    const build = this.getBuilding();
    const safe = this.getSafeZone();
    Promise.all([build, safe])
    .then(([building, safezone]) => {
      let mappedBuilding = building.map(coordinate=>{
        return [coordinate.longitude, coordinate.latitude];
      });

      let mappedSafeZone = safezone.map(coordinate=>{
        return [coordinate.longitude, coordinate.latitude];
      });
      this.interval = setInterval(()=>{this.checkLocation(mappedBuilding)}, 10000);
    });
  };

  checkLocation=(mappedBuilding) => {
    
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };
  
    const { latitude, longitude } = this.state;
  
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }, () => {
          if(inside([longitude, latitude], mappedBuilding) && this.state.user){
            api.userInBuilding(this.state.user)
          }else if(!inside([longitude, latitude], mappedBuilding) && this.state.user){
            api.userExitBuilding(this.state.user)
          }

          // this.setState({
          //   inSafeZone: inside([latitude, longitude], safeZonePolygon),
          //   inBuilding: inside([latitude, longitude], buildingPolygon),
          // });
        });
      }, error => alert(error.message), options,
    );
  }

getUserId=(userId)=>{
  this.setState({
user:userId
  })

}

  getSafeZone = () => api.getSafeZone().then(data => data.val());

  getBuilding = () => api.getBuilding().then(data => data.val());

  // componentDidUpdate(prevProps, prevState) {
  //   switch (newStatus) {
  //     case prevState === null: this.state.dbEmergencyStatus;
  //     case prevState === false: this.state.dbEmergencyStatus;
  //     case prevState === true: this.state.dbEmergencyStatus;
  //   }
  // }

  render() {
    return (
      <GlobalProvider appState={this.state} getUserId={this.getUserId}>
        <Routes />
      </GlobalProvider>)
  }
}
