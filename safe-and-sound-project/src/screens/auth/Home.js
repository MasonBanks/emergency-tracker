import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import FireEscapeMap from '../../components/FireEscapeMap';
import EmergencyUserMap from '../../components/EmergencyUserMap';
import { GlobalContext } from '../../ContextStore/GlobalContext';
import * as api from '../../../api';

const animation = { type: 'top', duration: 1000 };
const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greenButton: {
    backgroundColor: 'green',
    width: '40%',
    height: 40,
    margin: 8,
    paddingTop: 7,
  },
  redButton: {
    backgroundColor: 'red',
    width: '40%',
    height: 40,
    margin: 8,
    paddingTop: 7,
  },
});

export default (Home = ({ router }) => (
  <GlobalContext.Consumer>
    {({ state }) => (
      <Screen
        backgroundColor={state.mode.emergency ? '#F05555' : '#4ec3c9'}
        title="Home"
      >
        {state.mode.emergency ? (
          <View style={styles.outterContainer}>
            <EmergencyUserMap />
            <View style={styles.buttonContainer}>
              <Button
                style={styles.greenButton}
                onPress={() => {
                  api.updateUser(state.auth.authenticated, {
                    markedSafe: true,
                    markedInDanger: false,
                  });
                  api.addMeToEvacSafeList(state.auth.authenticated);
                  alert('You have been marked safe. Please wait patiently within the safe zone until given further instructions from the fire warden or emergency services. Thank you!');
                }}
                text="Mark Safe"
              />
              <Button
                style={styles.redButton}
                onPress={() => {
                  api.updateUser(state.auth.authenticated, {
                    markedInDanger: true,
                  });
                  alert('An alert has been signaled to the fire warden and your location will be relayed to the emergency services. Please remain calm, help is on the way!');
                }}
                text="I am in danger!"
              />
            </View>
          </View>
        ) : (
          <FireEscapeMap />
        )}
      </Screen>
    )}
  </GlobalContext.Consumer>
));
