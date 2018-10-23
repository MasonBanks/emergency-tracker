import React from 'react';

import Button from '../../components/Button';
import Screen from '../../components/Screen';
import LocationPicker from '../../components/LocationPicker';
import styles from '../../components/styles';

const animation = { type: 'bottom', duration: 500 };

export default ({ router }) => (
  <Screen backgroundColor="#5f1854" title="">
    <LocationPicker />
    <Button
      onPress={() => {
        router.pop();
      }}
      text="back"
      style={styles.backButton}
    />
  </Screen>
);
