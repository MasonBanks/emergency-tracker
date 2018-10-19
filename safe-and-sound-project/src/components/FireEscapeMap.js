import React from "react";
import MapView from "react-native-maps";

export default class App extends React.Component {
  state={
    currentArea: [],
    region:{
      latitude: 43.4807593,
      longitude: -1.2426305,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0021
    },
    safezone:[{
      "latitude": 53.48397908451812,
      "longitude": -2.2426030213088165,
      },
      {
       "latitude": 53.486986686340465,
      "longitude": -2.2453671080128724,
      },
      {
      "latitude": 53.48638329743184,
      "longitude": -2.235059018856967,
      },
      {
      "latitude": 53.48353594020686,
      "longitude": -2.2362632420683735,
      },],
    building:[{
      "latitude": 53.47851429362762,
      "longitude": -2.2459109006015616,
      },
      {
      "latitude": 53.48056993658202,
        "longitude": -2.244247168413971,
      },
      {
      "latitude": 53.429706154268154,
      "longitude": -2.241331675818669,
      },
      {
      "latitude": 53.47819367978521,
      "longitude": -2.242646816500184,
      }]
  };

componentDidMount(){
  this.findEdges()
}

  render() {
    let regState = this.state.region;

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 53.4807593,
          longitude: -2.2426305,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0021
        }}
        region={regState}
        showsIndoors={true}
        onPress={e => this.handlePush(e.nativeEvent)}
        onRegionChangeComplete={e => this.handleMoveMap(e)}
      >
        <MapView.Polygon
          title="Safe Zone"
          coordinates={this.state.building}
          description="Safe Zone Boundry"
          fillColor="rgba(255,0,0,0.1)"
        />

                <MapView.Polygon
          title="Safe Zone"
          coordinates={this.state.safezone}
          description="Safe Zone Boundry"
          fillColor="rgba(255,0,0,0.1)"
        />
      </MapView>
    );
  }

  findEdges = () => {
    let latitudeArray = this.state.safezone.concat(this.state.building).map(coordinate=>{
      return coordinate.latitude
    })

    let longitudeArray = this.state.safezone.concat(this.state.building).map(coordinate=>{
      return coordinate.longitude
    })

    let westEdge= Math.min(...latitudeArray);
    let eastEdge= Math.max(...latitudeArray);
    let northEdge=Math.max(...longitudeArray);
    let southEdge=Math.min(...longitudeArray);
    let longitudeDelta = northEdge-southEdge;
    let latitudeDelta = eastEdge-westEdge;

    this.setState({
      region: {
        latitude: (westEdge+eastEdge)/2,
        longitude: (northEdge+southEdge)/2,
        latitudeDelta,
        longitudeDelta,
      }
    })
  }
}