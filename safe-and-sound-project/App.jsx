import React from 'react';
import { StyleSheet, Text, View } from 'react-native';;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to our project, people!</Text>
        <Text>First, create your own branch</Text>
        <Text>After you commit that, then we can merge it to our dev branch</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
