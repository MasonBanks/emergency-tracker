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
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    api.getEvacList(this.props.contextState.auth.authenticated)
      .then((liveUsers) => {
        this.setState({
          liveUsers,
        });
      });
  }

  render() {
    return (
      <ScrollView>
        <Text>IT'S AN EMERGENCY!</Text>
      </ScrollView>
    );
  }
}


export default EmergencyList;
