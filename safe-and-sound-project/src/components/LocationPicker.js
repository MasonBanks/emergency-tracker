import React from 'react';
import MapView from 'react-native-maps';
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
  }

  handleSubmit = (zone) => {
    api.saveSafeZone(this.state.currentArea, zone);
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
          <MapView.Polygon
            title="Safe Zone"
            coordinates={currentArea}
            description="Safe Zone Boundry"
            fillColor="rgba(255,0,0,0.1)"
          />

          {currentArea.map(point => (
            <MapView.Marker
              key={point.latitude + point.longitude}
              title="Safe Zone"
              coordinate={point}
              description="Safe Zone Boundry"
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
        <Button
          onPress={() => {
            router.pop();
          }}
          text="back"
        />
      </Screen>
    );
  }
}
