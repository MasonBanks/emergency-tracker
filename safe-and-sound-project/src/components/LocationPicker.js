import React from 'react';
import MapView from 'react-native-maps';
import { Platform } from 'react-native';
import { Permissions, Location } from 'expo';
import Screen from './Screen';
import Button from './Button';
import * as api from '../../api';

export default class App extends React.Component {
  state = {
    currentArea: [],
    region: {
      latitude: 53.4807593,
      longitude: -2.2426305,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0021,
    },
  };

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.iosGetLocation();
    } else {
      this.androidGetLocationAsync();
    }
  }

  iosGetLocation = () => {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };
    const { region } = this.state;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            ...region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      error => alert(error.message),
      options,
    );
  };

  androidGetLocationAsync = async () => {
    const { region } = this.state;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        region: {
          ...region,
          longitude: -2.2398000955581665,
          latitude: 53.486491111816854,
        },
      });
    } else {
      await Location.getCurrentPositionAsync()
        .then((position) => {
          this.setState({
            region: {
              ...region,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  handleSubmit = (zone) => {
    const { currentArea } = this.state;
    api.saveSafeZone(currentArea, zone);
    this.setState({
      currentArea: [],
    });
  };

  handleMoveMap = (region) => {
    this.setState({
      region,
    });
  };

  handlePush = (e) => {
    const newPoint = e.coordinate;
    const { currentArea } = this.state;
    const newPoints = [...currentArea, newPoint];
    this.setState({
      currentArea: newPoints,
    });
  };

  render() {
    const { region, currentArea } = this.state;

    return (
      <Screen backgroundColor="#5f1854" title="Zone Picker">
        <MapView
          style={{ flex: 1, height: 200, width: 400 }}
          initialRegion={{
            latitude: 53.4807593,
            longitude: -2.2426305,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0021,
          }}
          region={region}
          onPress={e => this.handlePush(e.nativeEvent)}
          onRegionChangeComplete={e => this.handleMoveMap(e)}
        >
          {currentArea.length !== 0 && (
            <MapView.Polygon
              title="Safe Zone"
              coordinates={currentArea}
              description="Safe Zone Boundary"
              fillColor="rgba(255,0,0,0.1)"
            />
          )}

          {currentArea.map(point => (
            <MapView.Marker
              key={point.latitude + point.longitude}
              title="Safe Zone"
              coordinate={point}
              description="Safe Zone Boundary"
            />
          ))}
        </MapView>
        <Button
          onPress={() => this.handleSubmit('safeZone')}
          text="save Safe Zone"
        />
        <Button
          onPress={() => this.handleSubmit('building')}
          text="save building"
        />
        {/* <Button
          onPress={() => {
            router.pop();
          }}
          text="back"
        /> */}
      </Screen>
    );
  }
}
