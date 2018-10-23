import React from 'react';
import { View, Text } from 'react-native';
import getAllUsers from '../api';

export default class EmergencyContacts extends React.Component {
  state = {};

  render() {
    return (
      <View>
        {getAllUsers().map(user => (
          <Text>{user.firstName}</Text>
        ))}
      </View>
    );
  }
}
