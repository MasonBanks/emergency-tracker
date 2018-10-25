import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import FireEscapeMap from '../../components/FireEscapeMap';
import EmergencyUserMap from '../../components/EmergencyUserMap';
import { GlobalContext } from '../../ContextStore/GlobalContext';
import { updateUser, addMeToEvacSafeList } from '../../../api';

const animation = { type: 'top', duration: 1000 };
const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  },
  redButton: {
    backgroundColor: 'red',
    width: '40%',
    height: 40,
  },
});

export default (Home = ({ router }) => (
  <GlobalContext.Consumer>
    {({ state, setMode }) => (
      // console.log(state.myCoordinates);
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
                  updateUser(state.auth.authenticated, {
                    markedSafe: true,
                    markedInDanger: false,
                  });
                }}
                text="Mark Safe"
              />
              <Button
                style={styles.redButton}
                onPress={() => {
                  api.updateUser(state.auth.authenticated, {
                    markedInDanger: true,
                  });
                  addMeToEvacSafeList(state.auth.authenticated);
                  api.sendLocation(state.myCoordinates);
                }}
                text="Im in Danger"
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
