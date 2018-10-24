import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import FireEscapeMap from '../../components/FireEscapeMap';
import { GlobalContext } from '../../ContextStore/globalContext';

const animation = { type: 'top', duration: 1000 };

export default Home = ({ router }) => (
  <GlobalContext.Consumer>
    {({ state, setMode }) => (
      <Screen backgroundColor={state.mode.emergency ? '#F05555' : '#55F0D6'} title="Home">
        <FireEscapeMap />
      </Screen>
    )}
  </GlobalContext.Consumer>
);
