import React from 'react';
import { Text, View } from 'react-native';
import Screen from './Screen';
import Button from './Button';
import {
  toggleEmergencyStatus,
  createNewEvacuation,
  endCurrentEvacuation,
  resetAllUsersStatus,
  updateUser,
  getAllUsers,
} from '../../api';

const animation = { type: 'right', duration: 1100 };

export default class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    state = {
      drill: 1,
    };
  }

  render() {
    const {
      router, closeDrawer, setAuth, state,
    } = this.props;

    return (
      <Screen backgroundColor={state.mode.emergency ? '#EE5353' : '#A575E3'}>
        {!state.mode.emergency && state.isAdmin.admin
          && (
            <View>
              <Button text="Evacuation Reports" />
              <Text style={{ fontSize: 20 }} />
              <Text style={{
                fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: 'white', marginLeft: 4, marginRight: 4,
              }}
              >
                TO INITIATE AN EMERGENCY EVACUATION
              </Text>
              <Text style={{
                fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: 'white', marginLeft: 4, marginRight: 4,
              }}
              >
                {' '}
                Hold button below for 2 seconds
              </Text>
              <Text style={{
                fontSize: 15, textAlign: 'center', color: 'white', marginLeft: 4, marginRight: 4,
              }}
              >
                Tap once for a drill/exercise
              </Text>
            </View>
          )
        }
        {state.mode.emergency && this.state.drill === true
          && (
            <View>
              <Text style={{
                fontSize: 20, backgroundColor: '#ff7f7f', textAlign: 'center', fontWeight: 'bold', color: 'white', marginLeft: 4, marginRight: 4,
              }}
              >
                DRILL MODE
              </Text>
            </View>
          )
        }
        {state.isAdmin.admin && (
          <Button
            onLongPress={() => {
              this.setState({
                drill: false,
              });
              const timestamp = Date.now();
              if (!state.mode.emergency) {
                createNewEvacuation(state.auth.authenticated, timestamp, false);
              } else {
                endCurrentEvacuation(state.auth.authenticated, timestamp).then(
                  resetAllUsersStatus(getAllUsers, updateUser),
                );
              }
              toggleEmergencyStatus(state.mode.emergency);
            }}
            text={
              state.mode.emergency ? 'Quit Emergency Mode' : 'Enter Emergency Mode'
            }
            onPress={() => {
              this.setState({
                drill: true,
              });
              const timestamp = Date.now();
              if (!state.mode.emergency) {
                createNewEvacuation(state.auth.authenticated, timestamp, true);
              } else {
                endCurrentEvacuation(state.auth.authenticated, timestamp).then(
                  resetAllUsersStatus(getAllUsers, updateUser),
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
  }
}
