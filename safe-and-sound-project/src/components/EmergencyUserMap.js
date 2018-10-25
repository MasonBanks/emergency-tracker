import React from 'react';
import MapView from 'react-native-maps';
import { Image } from 'react-native';
import * as api from '../../api';

export default class EmergencyUserMap extends React.Component {
  state = {
    region: {
      latitude: 43.4807593,
      longitude: -1.2426305,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0021,
    },
    safezone: [
      {
        longitude: -2.2398000955581665,
        latitude: 53.486491111816854,
      },
      {
        longitude: -2.239486277103424,
        latitude: 53.48684221878136,
      },
      {
        longitude: -2.2398510575294495,
        latitude: 53.486947550303995,
      },
      {
        longitude: -2.240191698074341,
        latitude: 53.486594848267956,
      },
      {
        longitude: -2.2398000955581665,
        latitude: 53.486491111816854,
      },
    ],
    myLocation: [],
  };

  componentDidMount() {
    const safe = this.getSafeZone();
    Promise.all([safe]).then(([safezone]) => {
      this.setState(
        {
          safezone,
        },
        () => {
          this.findEdges();
        },
      );
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { myLocation } = this.state;
    if (myLocation[0] && !prevState.myLocation[0]) {
      this.findEdges();
    }
  }

  getSafeZone = () => api.getSafeZone().then(data => data.val());

  findEdges = () => {
    this.iosGetLocation();
    const { safezone, myLocation } = this.state;
    const latitudeArray = safezone
      .concat(myLocation)
      .map(coordinate => coordinate.latitude);
    const longitudeArray = safezone
      .concat(myLocation)
      .map(coordinate => coordinate.longitude);
    const westEdge = Math.min(...latitudeArray);
    const eastEdge = Math.max(...latitudeArray);
    const northEdge = Math.max(...longitudeArray);
    const southEdge = Math.min(...longitudeArray);
    const longitudeDelta = (northEdge - southEdge) + 0.0002;
    const latitudeDelta = (eastEdge - westEdge) + 0.0002;

    this.setState({
      region: {
        latitude: (westEdge + eastEdge) / 2,
        longitude: (northEdge + southEdge) / 2,
        latitudeDelta,
        longitudeDelta,
      },
    });
  };


  iosGetLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          myLocation: [{
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          }],

        });
      },
      error => alert(error.message),
      options,
    );
  };

  render() {
    const { region, safezone, myLocation } = this.state;

    return (
      <MapView
        style={{ flex: 1, height: 200, width: 400 }}
        initialRegion={{
          latitude: 53.4807593,
          longitude: -2.2426305,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0021,
        }}
        region={region}
        zoomControlEnabled={false}
      >
        {myLocation[0]
          && (
            <MapView.Marker
              coordinate={myLocation[0]}
            >
              <Image source={require('../assets/images/mapmarker.png')} style={{ width: 40, height: 40 }} />
            </MapView.Marker>
          )
        }

        <MapView.Polygon
          title="Safe Zone"
          coordinates={safezone}
          description="Safe Zone Boundry"
          fillColor="rgba(0,255,0,0.1)"
        />
      </MapView>
    );
  }
}
