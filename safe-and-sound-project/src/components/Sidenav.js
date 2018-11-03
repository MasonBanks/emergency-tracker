import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import Screen from './Screen';
import Button from './Button';
import * as api from '../../api';
import { generateEvacReports } from '../utils/generateEvacReports';

const animation = { type: 'right', duration: 1100 };

export default class Sidenav extends React.Component {
  constructor(props) {
    super(props);
    state = {
      drill: null,
      evacReport: null,
    };
  }

  componentWillMount() {
    this.setState({
      drill: false,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.evacReport && nextState.evacReport) {
      alert(`Emergency procedure complete! Report: 
      Date: ${nextState.evacReport.date}, 
      Head count: ${nextState.evacReport.headCount}, 
      Marked Safe: ${nextState.evacReport.markedSafe},
      Total duration: ${nextState.evacReport.totalDuration}, 
      Avg evacuation time: ${nextState.evacReport.averageEvacTime}, 
      Drill: ${nextState.evacReport.drill}`);
    }
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
                fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: '#F08080', marginLeft: 4, marginRight: 4,
              }}
              >
                TO INITIATE AN EMERGENCY EVACUATION
              </Text>
              <Text style={{
                fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: 'pink', marginLeft: 4, marginRight: 4,
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
        {state.isAdmin.admin && (
          <Button
            onLongPress={() => {
              api.toggleEmergencyStatus(state.mode.emergency);
              const timestamp = Date.now();
              if (!state.mode.emergency) {
                api.createNewEvacuation(state.auth.authenticated, timestamp, false);
              } else {
                api.endCurrentEvacuation(state.auth.authenticated, timestamp)
                  .then(() => api.resetAllUsersStatus(api.getAllUsers, api.updateUser))
                  .then(() => api.getLatestEvacReport(generateEvacReports))
                  .then((evacReport) => {
                    this.setState({
                      evacReport,
                    });
                  });
              }
            }}
            text={
              state.mode.emergency ? 'Quit Emergency Mode' : 'Enter Emergency Mode'
            }
            onPress={() => {
              this.setState({
                drill: true,
              });
              api.toggleEmergencyStatus(state.mode.emergency);
              const timestamp = Date.now();
              if (!state.mode.emergency) {
                api.createNewEvacuation(state.auth.authenticated, timestamp, true);
              } else {
                api.endCurrentEvacuation(state.auth.authenticated, timestamp)
                  .then(() => api.resetAllUsersStatus(api.getAllUsers, api.updateUser))
                  .then(() => api.getLatestEvacReport(generateEvacReports))
                  .then((evacReport) => {
                    this.setState({
                      evacReport,
                    });
                  });
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
