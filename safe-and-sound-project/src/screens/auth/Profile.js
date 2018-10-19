import React from 'react';
import { View } from 'react-native'

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import FireEscapeMap from '../../components/FireEscapeMap';
import styles from '../../components/styles';

const animation = { type: 'bottom', duration: 500 };

export default ({ router }) => (
  <Screen backgroundColor="#ffffff" title="Profile">
      <FireEscapeMap />
    <Button
      onPress={() => {
        router.push.Settings({}, animation);
      }}
      text={`push.Settings({}, ${JSON.stringify(animation)})`}
    />
    <Button
      onPress={() => {
        router.pop();
      }}
      text="back"
    />
  </Screen >
);

