import React from 'react';

import Screen from './Screen';
import Button from './Button';
import GlobalContext from '../ContextStore/globalContext';
import { toggleEmergencyStatus } from '../../api';

const animation = { type: 'right', duration: 1100 };

export default ({
  router, closeDrawer, setAuth, state,
}) => (
  <Screen backgroundColor="rgb(255,255,255)" title="Sidenav">
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
        toggleEmergencyStatus();
      }}
      text={state.mode.emergency ? 'Quit Emergency Mode' : 'Enter Emergency Mode'}
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
