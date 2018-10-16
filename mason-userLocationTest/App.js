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
          <MapView
            ref={map => this.map = map}
            provider={'google'}
            style={styles.map}
            initialRegion={this.state.region}
            showUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            loadingEnabled={true}
          >
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
    // this.setState({
    //   marginBottom: 0
    // })
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

const { width, height } = Dimensions.get("window")
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
