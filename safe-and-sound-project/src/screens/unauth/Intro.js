import React from 'react';
import { View, Image } from 'react-native';
import styles from '../../components/styles';
import Screen from '../../components/Screen';
import Button from '../../components/Button';

const animation = { type: 'top', duration: 500 };


export default ({ router }) => (
  <Screen>
    <View style={styles.logoContainer}>
      <Image source={require('../../assets/images/safensound-no_outline.png')} resizeMode="contain" style={styles.logo} />
    </View>
    <Button
      onPress={() => {
        router.push.Login({}, animation);
      }}
      text="Login"
    />
    <Button
      onPress={() => {
        router.push.Register({}, animation);
      }}
      text="Register"
    />
  </Screen>
);
