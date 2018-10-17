import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { config } from '../config/firebase-config';

firebase.initializeApp(config);

const { database } = firebase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class SiteRegistration extends React.Component {
  writeNewSite = (userId, siteName, address, safeZone, buildingZone) => {
    database().ref(`sites/${userId}`).set({
      siteName,
      admin: userId,
      address,
      safeZone,
      buildingZone,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi</Text>
        {this.writeNewSite('test user', 'fed house', 'fed street', ' testsafezone', 'testbuildingzone')}
      </View>
    );
  }
}
