import React from 'react';
import {
  View, Image, StyleSheet, Dimensions,
} from 'react-native';
import Screen from '../../components/Screen';
import Button from '../../components/Button';

const animation = { type: 'fade', duration: 1200 };

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    height,
    width,
    alignItems: 'center',
  },
  // logo: {
  //   resizeMode: 'contain'
  // }
});

export default ({ router }) => (
  <View style={styles.logoContainer}>
    <Screen backgroundColor="#fbfbfb" title="">
      <Image source={require('../../assets/images/safensound2.png')} />
      <Button
        onPress={() => {
          router.push.Login({}, animation);
        }}
        text="Login"
      />
    </Screen>
  </View>
);
