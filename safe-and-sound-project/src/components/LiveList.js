import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { ScrollView, StyleSheet } from 'react-native';
import * as api from '../../api';
// import users from '../test_db/user_db.json'


const styles = StyleSheet.create({
  list: {
    width: '90%',
    backgroundColor: 'rgba(0,0,0,.4)',
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
    return (
      <ScrollView style={styles.list}>
        {
          this.state.liveUsers.map(user => (
            <ListItem
              titleStyle={{ color: 'white' }}
              subtitleStyle={{ color: 'grey' }}
              key={user.uid}
              title={`${user.lName}, ${user.fName}`
              }
              subtitle={user.isFirstAider ? 'First Aider' : null}
              rightTitle={user.isAdmin ? 'Admin' : 'Personnel'}
            />
          ))
        }

      </ScrollView>
    );
  }
}


export default LiveList;
