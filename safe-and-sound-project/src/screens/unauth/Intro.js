import React from 'react';
import {
  View, Image, StyleSheet, Dimensions,
} from 'react-native';
import Screen from '../../components/Screen';
import Button from '../../components/Button';

const animation = { type: 'top', duration: 500 };

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    height,
    width,
    alignItems: 'center',
  },
  logo: {

  }
});

export default ({ router }) => (
  <View style={styles.logoContainer}>
    <Screen backgroundColor="#fbfbfb" title="">
      <View style={styles.logo}>
        <Image source={require('../../assets/images/safensound2.png')} resizeMode='contain' />
      </View>
      <Button
        onPress={() => {
          router.push.Login({}, animation);
        }}
        text="Login"
      />
    </Screen>
  </View>
);
