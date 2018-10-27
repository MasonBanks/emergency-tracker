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
    snapshot: [],
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
    const uid = this.state.snapshot.reduce((acc, user) => {
      acc.push(user.uid);
      return acc;
    }, []);
    const users = this.state.liveUsers.filter((user) => {
      if (uid.includes(user.uid)) return user;
    });
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
    if (this.state.snapshot.length < 1) {
      return (
        <View style={{
          width: '75%',
          flex: 1,
          justifyContent: 'center',
          // alignItems: 'justify',
        }}
        >
          <Text style={{ fontSize: 30, color: 'white' }}>This is an emergency.</Text>
          <Text style={{ fontSize: 20, color: 'white' }}>Please calmly make your way to the designated safe zone area.</Text>
        </View>
      );
    }
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
                leftAvatar={{ rounded: true, source: (user.avatar.length > 1) ? { uri: `${user.avatar}` } : { uri: 'https://cdn0.iconfinder.com/data/icons/ui-essence/32/_68ui-512.png' } }}
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
