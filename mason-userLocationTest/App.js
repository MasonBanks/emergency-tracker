import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, AppRegistry, ScrollView, Animated } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import { Location, Constants, Permissions, Marker } from 'expo';

export default class App extends Component {
  state = {
    markers: {
      latitude: 53.48666571807256,
      longitude: -2.239888755138964
    },
    region: {
      locationResult: null,
      latitude: Number,
      longitude: Number,
      latitudeDelta: Number,
      longitudeDelta: Number,
    }
  }
  render() {
    // this is essentially the loading page until the map populates
    if (!this.state.region.locationResult) {
      return (
        <View style={styles.loadingTitle}>
          <Image source={require('./assets/images/safensound2.png')} style={styles.imageFormat} />
          <Text>"Keep Calm and Count On"</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          {/* this component is what hosts the map */}
          <MapView
            ref={map => this.map = map}
            // if you are using ios and remove provider, the map will load an Apple maps instance
            provider={'google'}
            style={styles.map}
            initialRegion={this.state.region}
            showUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            loadingEnabled={true}
          >
            {/* inside some components there are children that can add other elements. This adds a rudimentary user marker */}
            <MapView.Marker
              coordinate={
                this.state.markers
              }
              pinColor={'blue'}
            />
          </MapView>
        </View >
      );
    }
  }
  componentDidMount() {
    setInterval(this._getLocationAsync, 3000);
    console.log('this is working?')
  }
  componentWillUnmount() {
    clearInterval(this.interval)
    console.log('updating')
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
    this.setState({
      markers: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      region: {
        locationResult: JSON.stringify(location),
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.002
      }
    });
    console.log(this.state.markers)
  };

}

// expo has a built in method of getting the dimensions of whatever device you are using
const { width, height } = Dimensions.get("window")

// styling is at the bottom of document, though if we are using global settings it can be kept in at constants folder
const styles = StyleSheet.create({
  loadingTitle: {
    height: '75%',
    width: width,
    alignItems: 'center',
    justifyContent: "center"
  },
  imageFormat: {
    width: 200,
    height: 180,
    resizeMode: 'contain'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
