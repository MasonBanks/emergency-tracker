import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import * as _ from 'lodash';
import * as api from '../../api';


const styles = StyleSheet.create({
  list: {
    width: '90%',
  },
});
class EmergencyList extends Component {
  state = {
    liveUsers: [],
    user: [],
  }

  componentDidMount() {
    this.getSnapshot(Object.values(this.props)[0]);
    this.getUsers();
    this.interval = setInterval(this.getUsers, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getSnapshot = (id) => {
    api.getEvacList(id)
      .then((snapshot) => {
        this.setState({
          snapshot,
        });
      });
  }

  getUsers = () => {
    api.getAllUsers()
      .then((users) => {
        this.setState({
          liveUsers:
            Object.values(users).reduce((acc, user) => {
              acc.push(user);
              return acc;
            }, []),
        });
      });
  }

  render() {
    const users = this.state.liveUsers;
    const user = users.map(x => ({
      ...x,
      sortValue:
          (x.markedInDanger) ? 1
            : (x.markedSafe) ? 5
              : (x.inBuilding) ? 2
                : (x.inSafeZone) ? 4
                  : 3,
    }));
    userSorted = _.sortBy(user, x => x.sortValue);

    total = userSorted.reduce((acc) => {
      if (userSorted) {
        acc++;
      } return acc;
    }, 0);
    safe = userSorted.reduce((acc, user) => {
      if (user.markedSafe) {
        acc++;
      } return acc;
    }, 0);
    return (
      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key="emergency_roster"
      >
        <Text key="emergency_count">{`${safe}/${total}`}</Text>
        <ScrollView style={styles.list}>
          {
            userSorted.map(user => (
              <ListItem
                titleStyle={{ color: (user.markedInDanger || user.markedSafe) ? 'white' : 'black' }}
                containerStyle={{
                  backgroundColor: (user.markedInDanger) ? '#d32121' : (user.markedSafe) ? '#35d220' : (user.inBuilding) ? '#ffe0e0' : (user.inSafeZone) ? '#e7ffe0' : (!user.inBuilding && !user.inSafeZone) ? '#e0f5fc' : '#ccefff',
                  borderWidth: 1,
                  borderColor:
                    '#c1c1c1',
                  marginBottom: 2,
                }}
                subtitleStyle={{ color: (user.markedInDanger || user.markedSafe) ? 'white' : 'grey' }}
                key={`${user.uid}+${user.fName}`}
                title={`${user.lName}, ${user.fName}`
                }
                leftAvatar={{ rounded: true, source: { uri: `${user.avatar}` } }}
                subtitle={user.isFirstAider ? 'First Aider' : null}
                rightSubtitle={user.isAdmin ? 'Admin' : 'Personnel'}
              />
            ))
          }
        </ScrollView>
      </View>
    );
  }
}


export default EmergencyList;
