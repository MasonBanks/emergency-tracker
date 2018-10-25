import React from 'react';
import {
  Text, View, Image, Dimensions,
} from 'react-native';
import * as api from '../../api';

const styles = StyleSheet.create({
  list: {
    width: '80%',
  },
});

export default class EvacReports extends React.Component {
  constructor(props) {
    super(props);
    state = {
      evacReports: {},
    };
  }


  componentDidMount() {
    api.getEvacReports();
    this.interval = setInterval(api.getEvacReports, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}
