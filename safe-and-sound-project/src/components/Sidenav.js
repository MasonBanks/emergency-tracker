import React from 'react';

import Screen from './Screen';
import Button from './Button';
import GlobalContext from '../ContextStore/globalContext';
import toggleEmergencyStatus from '../../api';

const animation = { type: 'right', duration: 1100 };

export default ({
  router, closeDrawer, setAuth, setMode, state,
}) => (

  <Screen backgroundColor="#5c3c10" title="Sidenav">
    <Button
      onPress={() => {
        if (router) {
          router.push.Profile({}, animation);
        }
        closeDrawer();
      }}
      text={`push.Profile({}, ${JSON.stringify(animation)})`}
    />
    <Button
      onPress={() => {
        closeDrawer();
      }}
      text="Close the drawer"
    />

    {state.isAdmin.admin && (
      <Button
        onPress={() => {
          toggleEmergencyStatus(state.mode.emergency);
        }}
        text="Toggle Emergency!!"
      />
    )}

    <Button
      onPress={() => {
        setAuth(false);
      }}
      text="Logout"
    />
  </Screen>

);
