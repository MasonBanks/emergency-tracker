import React from 'react';

import Screen from '../../components/Screen';
import Button from '../../components/Button';
import FireEscapeMap from '../../components/FireEscapeMap';
import { GlobalContext } from '../../ContextStore/globalContext';

const animation = { type: 'top', duration: 1000 };

export default ({ router }) => (
  <GlobalContext.Consumer>
    {({ state }) => (
      <Screen backgroundColor={state.isAdmin.admin ? '#82E0AA' : '#C39BD3'} title="Home">
        {/* <FireEscapeMap /> */}
        <Button text={state.auth.authenticated} />
        <Button text={state.mode.emergency ? 'AHHHH!!' : 'chillz!'} />
      </Screen>
    )}
  </GlobalContext.Consumer>
);
