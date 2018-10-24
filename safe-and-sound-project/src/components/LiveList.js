import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import * as api from '../../api';

const styles = StyleSheet.create({
  list: {
    width: '75%',
  }
})
class LiveList extends Component {
  state = {
    liveUsers: [],
  }

  componentDidMount() {
    api.getAllUsers()
    // .then((users) => {
    //   const liveUsers = users.reduce((acc, user) => {
    //     acc.push(user[0]);
    //     return acc;
    //   }, []);
    //   console.log(liveUsers);
    //   this.setState({
    //     liveUsers,
    //   });
    // });
  }

  render() {
    return (
      <View style={styles.list}>
        {
          this.state.liveUsers.map((user) => (
            <ListItem
              style={styles.listItem}
              key={user.fName}
              title={user.fName}
              subtitle={user.subtitle}
            />
          ))
        }

      </View>
    );
  }
}


export default LiveList;
