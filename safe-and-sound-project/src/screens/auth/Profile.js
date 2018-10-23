import React from 'react';

import { View } from 'react-native';

import Screen from '../../components/Screen';
import LocationPicker from '../../components/LocationPicker';
import styles from '../../components/styles';

const animation = { type: 'bottom', duration: 500 };

export default ({ router }) => (

  <Screen backgroundColor="#5f1854" title="">
    <LocationPicker />
  </Screen>
);
