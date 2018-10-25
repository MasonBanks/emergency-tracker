import React from 'react';
import Screen from './Screen';
import Button from './Button';
import {
  toggleEmergencyStatus,
  createNewEvacuation,
  endCurrentEvacuation,
  resetAllUsersStatus,
  updateUser,
  getAllUsers
} from '../../api';

const animation = { type: 'right', duration: 1100 };

export default ({ router, closeDrawer, setAuth, state }) => (
  <Screen backgroundColor={state.mode.emergency ? '#EE5353' : '#A575E3'}>
    {state.isAdmin.admin && (
      <Button
        onPress={() => {
          const timestamp = Date.now();
          if (!state.mode.emergency) {
            createNewEvacuation(state.auth.authenticated, timestamp);
          } else {
            endCurrentEvacuation(state.auth.authenticated, timestamp).then(
              resetAllUsersStatus(getAllUsers, updateUser)
            );
          }
          toggleEmergencyStatus(state.mode.emergency);
        }}
        text={
          state.mode.emergency ? 'Quit Emergency Mode' : 'Enter Emergency Mode'
        }
      />
    )}

    <Button
      onPress={() => {
        setAuth(false);
      }}
      text="Logout"
    />

    <Button
      onPress={() => {
        closeDrawer();
      }}
      text="⬅"
    />
  </Screen>
);
