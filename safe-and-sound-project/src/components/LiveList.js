import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { ScrollView, StyleSheet } from 'react-native';
import * as api from '../../api';
// import users from '../test_db/user_db.json'


const styles = StyleSheet.create({
  list: {
    width: '90%',
  },
});
class LiveList extends Component {
  state = {
    liveUsers: [],
  }


  componentDidMount() {
    this.getUsers();
    this.interval = setInterval(this.getUsers, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    users = users.sort((a, b) => b.isAdmin - a.isAdmin || b.isFirstAider - a.isFirstAider);
    return (
      <ScrollView key="idle_roster" style={styles.list}>
        {
          users.map(user => (
            <ListItem
              titleStyle={{ color: 'black' }}
              containerStyle={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'grey' }}
              subtitleStyle={{ color: 'grey' }}
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
    );
  }
}


export default LiveList;
