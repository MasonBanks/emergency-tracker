import React, { Component } from 'react';
import { View } from 'react-native';
// import MapView from 'react-native-maps';

export default class Map extends Component {
  state = {
    region: {
      locationResult: null,
      latitude: Number,
      longitude: Number,
      latitudeDelta: Number,
      longitudeDelta: Number,
    },
  }

  render() {
    return (
      <View style={styles.container} />
    );
  }
}
