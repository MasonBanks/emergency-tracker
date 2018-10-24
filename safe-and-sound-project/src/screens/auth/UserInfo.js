import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import LiveList from '../../components/LiveList';
import EmergencyList from '../../components/EmergencyList';
import { GlobalContext } from '../../ContextStore/GlobalContext';

const animation = { type: 'top', duration: 1000 };

export default ({ router }) => (
  <GlobalContext.Consumer>
    {({ state, setMode }) => (
      <Screen
        backgroundColor={state.mode.emergency ? '#F05555' : '#4ec3c9'}
        title="Roster"
      >
        {!state.mode.emergency ? <LiveList /> : <EmergencyList />}
        <Button
          onPress={() => {
            router.pop();
          }}
          text="back"
        />
      </Screen>
    )}
  </GlobalContext.Consumer>
);
