import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import FireEscapeMap from '../../components/FireEscapeMap';
import { GlobalContext } from '../../ContextStore/GlobalContext';

const animation = { type: 'top', duration: 1000 };

export default Home = ({ router }) => (
  <GlobalContext.Consumer>
    {({ state, setMode }) => (
      <Screen backgroundColor={state.mode.emergency ? '#F05555' : '#4ec3c9'} title="Home">
        {state.mode.emergency ? '#F05555' : <FireEscapeMap />}
        {/* */}
      </Screen>
    )}
  </GlobalContext.Consumer>
);
