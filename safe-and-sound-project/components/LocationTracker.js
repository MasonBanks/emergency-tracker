import React from "react";
import { StyleSheet, Text, View, Image, Animated } from "react-native";
import safeZoneGeoJSON from "./data/geoJSON.json";
import buildingGeoJSON from "./data/buildingGeoJSON.json";
import inside from 'point-in-polygon';
import * as api from './api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userName: "testuser",
      latitude: null,
      longitude: null,
      inSafeZone: false,
      inBuilding: false,
    };
  }
  
  componentDidMount() {
    this.interval = setInterval(this.checkLocation, 3000);
  }

componentDidUpdate(prevProps, prevState){
  if(prevState.inSafeZone!==this.state.inSafeZone){
    api.enterSafeZone(this.state.inSafeZone);
    console.log('safe zone switch activated')
  }
  if(prevState.inBuilding!==this.state.inBuilding){
    api.enterBuilding(this.state.inBuilding);
    console.log('building switch activated')
  }
}

componentWillUnmount(){
  clearInterval(this.interval)
}

checkLocation=()=>{
const polygon = safeZoneGeoJSON.features[0].geometry.coordinates[0].map(coordinates=>{
  return [coordinates[1],coordinates[0]]
})

const buildingPolygon = buildingGeoJSON.features[0].geometry.coordinates[0].map(coordinates=>{
  return [coordinates[1],coordinates[0]]
})


let options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

  navigator.geolocation.watchPosition(
    (position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, ()=>{
        this.setState({
          inSafeZone: inside([ this.state.latitude, this.state.longitude ], polygon),
          inBuilding: inside([ this.state.latitude, this.state.longitude ], buildingPolygon)
        })
        
      })
    }, (error) => alert(error.message), options)
}


  render() {
    return (
      <View
      style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
      >
  

      <Text>{!this.state.latitude && "Loading..."}</Text>

<Text>safezone</Text>
{!this.state.inSafeZone?<Image
  source={require('./assets/images/cross.png')}
  height="40"
  weight="40"
/>:<Image
  source={require('./assets/images/tick.png')}
  height="40"
  weight="40"
/>}
<Text>building</Text>
{!this.state.inBuilding?<Image
  source={require('./assets/images/cross.png')}
  height="40"
  weight="40"
/>:<Image
  source={require('./assets/images/tick.png')}
  height="40"
  weight="40"
/>}

  <Text>{this.state.latitude}</Text>
  <Text>{this.state.longitude}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "tomato",
    flex: 1,
    aspectRatio: 1
  },
  fixedRatio: {
    backgroundColor: "olivedrab",
    flex: 1,
    aspectRatio: 1
  }
});

