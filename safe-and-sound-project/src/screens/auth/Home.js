import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Permissions, Notifications } from 'expo';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import FireEscapeMap from '../../components/FireEscapeMap';
import EmergencyUserMap from '../../components/EmergencyUserMap';
import { GlobalContext } from '../../ContextStore/GlobalContext';
import { updateUser, addMeToEvacSafeList } from '../../../api';
import apiUrl from '../../../config/config';

const PUSH_ENDPOINT = `${apiUrl}/users/push`;

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
  },
  redButton: {
    backgroundColor: 'red',
    width: '40%',
    height: 40,
  },
});

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      uid: null
    };
    this.router = this.props.router
    // console.log('Constructor')
  }

  componentWillMount() {
    if (!this.state.uid) {
      return this.setState({
        uid: state.auth.authenticated
      })
    } else return;
  }

  componentDidMount() {
    console.log('Component did mount! These are the props:', this.props, 'This is the state: ', this.state)
    this.getPushTokenAsync()
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should component update', this.state.uid, nextState.uid)
    if (this.state.uid !== nextState.uid) return false
    else return true
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Component will update!', nextProps, nextState)
    this.registerForPushNotificationsAsync()
      .then()
  }

  getPushTokenAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();

    return this.setState({
      token
    })
  }

  registerForPushNotificationsAsync() {
    // POST the token to your backend server from where you can retrieve it to send push notifications.

    return fetch(`PUSH_ENDPOINT/${this.state.uid}/${this.state.token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: this.state.token,
        },
        user: {
          uid: this.state.uid,
        },
      }),
    });
  }

  render() {
    const { router } = this.props;
    return (
      <GlobalContext.Consumer>
        {({ state, setMode }) => (
          <Screen
            backgroundColor={state.mode.emergency ? '#F05555' : '#4ec3c9'}
            title="Home"
          >
            {!this.state.uid && (
              this.setState({
                uid: state.auth.authenticated
              })
            )}
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
                      addMeToEvacSafeList(state.auth.authenticated);
                      alert('You have been marked safe. Please wait patiently within the safe zone until given further instructions from the fire warden or emergency services. Thank you!');
                    }}
                    text="Mark Safe"
                  />
                  <Button
                    style={styles.redButton}
                    onPress={() => {
                      updateUser(state.auth.authenticated, {
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
    )
  }


}
