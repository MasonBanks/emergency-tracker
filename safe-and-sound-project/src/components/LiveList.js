import React, { Component } from 'react';
import { View, ListItem } from 'react-native';
import * as api from '../../api';

class LiveList extends Component {
  state = {
    liveUsers: [],
  }

  componentDidMount() {
    api.getAllUsers()
      .then((userData) => {
        console.log(userData);
      });
  }

  render() {
    return (
      <View>
        {this.state.liveUsers.map(user => <ListItem key={user.fname}>{user}</ListItem>)}
      </View>
    );
  }
}


export default LiveList;
