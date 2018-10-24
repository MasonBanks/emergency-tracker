import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { ScrollView, StyleSheet } from 'react-native';
import * as api from '../../api';
// import users from '../test_db/user_db.json'


const styles = StyleSheet.create({
  list: {
    width: '90%',
    borderBottomColor: 'grey',
    // backgroundColor: 'rgba(0,0,0,.4)',
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
    users = users.sort(function (a, b) {
      return b.isAdmin - a.isAdmin || b.isFirstAider - a.isFirstAider
    })
    console.log('users listed')
    return (
      <ScrollView style={styles.list}>
        {
          users.map(user => (
            <ListItem
              titleStyle={{ color: 'black' }}
              subtitleStyle={{ color: 'grey' }}
              key={user.uid}
              title={`${user.lName}, ${user.fName}`
              }
              leftAvatar={{ source: { uri: 'http://icons-for-free.com/free-icons/png/512/1287507.png', } }}
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
