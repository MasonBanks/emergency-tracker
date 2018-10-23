import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import LiveList from '../../components/LiveList';

export default ({ router }) => (
  <Screen backgroundColor="#ffffff" title="Settings">
    <LiveList />
    <Button
      onPress={() => {
        router.pop();
      }}
      text="back"
    />
  </Screen>
);
