import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import firebase from 'firebase';
import { AppLoading } from 'expo';
import { config } from './config/firebase-config';

firebase.initializeApp(config);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }
  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
        >
        </AppLoading>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.loadingTitle}>
            <Image source={require('./assets/images/safensound2.png')} style={styles.imageFormat} />
          </View>
          <Text>Welcome to our project</Text>
          <Text>First, create your own branch</Text>
          <Text>After you commit that, then we can merge it to our dev branch</Text>
        </View>
      );
    }
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/safensound2.png')
      ])
    ])
  }
  _handleLoadingError = error => {
    console.log(error)
  }
  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageFormat: {
    width: 200,
    height: 180,
    resizeMode: 'contain'
  },
  loadingTitle: {
    height: '25%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
