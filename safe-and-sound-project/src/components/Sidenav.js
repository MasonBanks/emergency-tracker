import React from 'react';
import { Text, View } from 'react-native';
import Screen from './Screen';
import Button from './Button';
import * as api from '../../api';

const animation = { type: 'right', duration: 1100 };

export default class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    state = {
      drill: null,
      evacReport: {}
    };
  }

  componentWillMount() {
    console.log('componentWillMount')
    this.setState({
      drill: false
    })
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
                api.createNewEvacuation(state.auth.authenticated, timestamp, false);
              } else {
                api.endCurrentEvacuation(state.auth.authenticated, timestamp).then(
                  api.resetAllUsersStatus(getAllUsers, updateUser),
                );
              }
              api.toggleEmergencyStatus(state.mode.emergency);
            }}
            text={
              state.mode.emergency ? 'Quit Emergency Mode' : 'Enter Emergency Mode'
            }
            onPress={() => {
              this.setState({
                drill: true,
              });
              const timestamp = Date.now();
              api.toggleEmergencyStatus(state.mode.emergency);
              if (!state.mode.emergency) {
                api.createNewEvacuation(state.auth.authenticated, timestamp, true);
              } else {
                api.endCurrentEvacuation(state.auth.authenticated, timestamp)
                  .then(() => {
                    console.log('ended current evacuation')
                    return api.resetAllUsersStatus(api.getAllUsers, api.updateUser)
                  })
                  .then(() => {
                    console.log('reset all users statuses')
                    return api.getEvacReports()
                  })
                  .then(() => {
                    console.log('called api.getEvacReports')
                  })
              }
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
