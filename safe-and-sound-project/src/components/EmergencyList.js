import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { ScrollView, StyleSheet, Text } from 'react-native';
import * as api from '../../api';


const styles = StyleSheet.create({
  list: {
    width: '90%',
  },
});
class EmergencyList extends Component {
  state = {
    liveUsers: [],
    user: []
  }

  componentDidMount() {
    this.getSnapshot(Object.values(this.props)[0]);
    this.getUsers()
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
    let users = this.state.liveUsers;
    console.log(this.state.liveUsers)
    users = users.sort((a, b) => b.markedInDanger - a.markedInDanger);
    return (
      <ScrollView style={styles.list}>
        {
          users.map(user => (
            <ListItem
              titleStyle={{ color: (user.markedInDanger || user.markedSafe) ? 'white' : 'black' }}
              containerStyle={{
                backgroundColor: (user.markedInDanger) ? '#d32121' : (user.markedSafe) ? '#35d220' : (user.inBuilding) ? '#ffe0e0' : (user.inSafeZone) ? '#e7ffe0' : (!user.inBuilding && !user.inSafeZone) ? '#e0f5fc' : '#ccefff', borderWidth: 1, borderColor:
                  '#c1c1c1', marginBottom: 2
              }}
              subtitleStyle={{ color: (user.markedInDanger || user.markedSafe) ? 'white' : 'grey' }}
              key={user.uid}
              title={`${user.lName}, ${user.fName}`
              }
              leftAvatar={{ rounded: true, source: { uri: `${user.avatar}` } }}
              subtitle={user.isFirstAider ? 'First Aider' : null}
              rightSubtitle={user.isAdmin ? 'Admin' : 'Personnel'}
            />
          ))
        }

      </ScrollView>
    );
  }
}



export default EmergencyList;
