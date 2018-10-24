import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';


export default ({ router }) => (
  <Screen backgroundColor="#4286f4" title="Settings">
    <Button
      onPress={() => {
        router.pop();
      }}
      text="back"
    />
  </Screen>
);
