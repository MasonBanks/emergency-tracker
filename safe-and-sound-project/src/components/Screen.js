import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

export default ({ backgroundColor, title, children }) => (
  <View style={[styles.container, { backgroundColor }]}>
    <Text style={styles.text}>
      {title}
      {'\n'}
    </Text>
    {children}
  </View>
);
