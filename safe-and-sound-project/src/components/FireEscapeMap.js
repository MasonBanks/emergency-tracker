import React from 'react';
import MapView from 'react-native-maps';
import * as api from '../../api';

export default class FireEscapeMap extends React.Component {
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
    building: [
      {
        longitude: -2.2398993372917175,
        latitude: 53.48647036449619,
      },
      {
        longitude: -2.2402507066726685,
        latitude: 53.48599955718398,
      },
      {
        longitude: -2.2395211458206177,
        latitude: 53.48578888916899,
      },
      {
        longitude: -2.239258289337158,
        latitude: 53.48625810286333,
      },
      {
        longitude: -2.2398993372917175,
        latitude: 53.48647036449619,
      },
    ],
  };

  componentDidMount() {
    const build = this.getBuilding();
    const safe = this.getSafeZone();
    Promise.all([build, safe]).then(([building, safezone]) => {
      this.setState(
        {
          building,
          safezone,
        },
        () => {
          this.findEdges();
        },
      );
    });
  }

  getSafeZone = () => api.getSafeZone().then(data => data.val());

  getBuilding = () => api.getBuilding().then(data => data.val());

  findEdges = () => {
    const { safezone, building } = this.state;
    const latitudeArray = safezone
      .concat(building)
      .map(coordinate => coordinate.latitude);
    const longitudeArray = safezone
      .concat(building)
      .map(coordinate => coordinate.longitude);
    const westEdge = Math.min(...latitudeArray);
    const eastEdge = Math.max(...latitudeArray);
    const northEdge = Math.max(...longitudeArray);
    const southEdge = Math.min(...longitudeArray);
    const longitudeDelta = northEdge - southEdge;
    const latitudeDelta = eastEdge - westEdge;

    this.setState({
      region: {
        latitude: (westEdge + eastEdge) / 2,
        longitude: (northEdge + southEdge) / 2,
        latitudeDelta,
        longitudeDelta,
      },
    });
  };

  render() {
    const { region, building, safezone } = this.state;

    return (
      <MapView
        style={{ flex: 1, height: 200, width: 200 }}
        initialRegion={{
          latitude: 53.4807593,
          longitude: -2.2426305,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0021,
        }}
        region={region}
        showsIndoors
      >
        <MapView.Polygon
          title="Safe Zone"
          coordinates={building}
          description="Safe Zone Boundry"
          fillColor="rgba(255,0,0,0.1)"
        />

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
