import React from 'react';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  state = {
    currentArea: [],
    region: {
      latitude: 43.4807593,
      longitude: -1.2426305,
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

  handleSubmit = () => {
    // here we need to add a function to add the current state
    // area to the site as either a safe zone or as a building
    console.log('saved!');
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
      <MapView
        style={{ flex: 1 }}
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
            key={point}
            title="Safe Zone"
            coordinate={point}
            description="Safe Zone Boundry"
          />
        ))}
      </MapView>
    );
  }
}
