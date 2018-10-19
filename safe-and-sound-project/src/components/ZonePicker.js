import React from 'react';
import {
  Text, View, Image,
} from 'react-native';
import inside from 'point-in-polygon';
import safeZoneGeoJSON from '../data/geoJSON.json';
import buildingGeoJSON from '../data/buildingGeoJSON.json';
import * as api from '../api';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      inSafeZone: false,
      inBuilding: false,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.checkLocation, 3000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { inSafeZone, inBuilding } = this.state;
    if (prevState.inSafeZone !== inSafeZone) {
      api.enterSafeZone(inSafeZone);
    }
    if (prevState.inBuilding !== inBuilding) {
      api.enterBuilding(inBuilding);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

checkLocation=() => {
  const polygon = safeZoneGeoJSON.features[0].geometry.coordinates[0]
    .map(coordinates => [coordinates[1], coordinates[0]]);

  const buildingPolygon = buildingGeoJSON.features[0].geometry.coordinates[0]
    .map(coordinates => [coordinates[1], coordinates[0]]);


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
        this.setState({
          inSafeZone: inside([latitude, longitude], polygon),
          inBuilding: inside([latitude, longitude], buildingPolygon),
        });
      });
    }, error => alert(error.message), options,
  );
}


render() {
  const {
    latitude, longitude, inSafeZone, inBuilding,
  } = this.state;
  return (
    <View
      style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>{!latitude && 'Loading...'}</Text>
      <Text>safezone!!!!!!</Text>
      {!inSafeZone ? (
        <Image
          source={require('../assets/images/cross.png')}
          height="40"
          weight="40"
        />
      ) : (
        <Image
          source={require('../assets/images/tick.png')}
          height="40"
          weight="40"
        />
      )}
      <Text>building</Text>
      {!inBuilding ? (
        <Image
          source={require('../assets/images/cross.png')}
          height="40"
          weight="40"
        />
      ) : (
        <Image
          source={require('../assets/images/tick.png')}
          height="40"
          weight="40"
        />
      )}

      <Text>{latitude}</Text>
      <Text>{longitude}</Text>
    </View>
  );
}
}
