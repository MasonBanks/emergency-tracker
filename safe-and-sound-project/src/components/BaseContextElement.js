import React, { Component } from 'react';
import { Text } from 'react-native';
import { GlobalContext } from '../ContextStore/globalContext';

class BaseContextElement extends Component {
  componentDidMount() {
    console.log(this.props.context);
  }

  render() {
    return (
      <GlobalContext.Consumer>
        <Text>Hello</Text>
      </GlobalContext.Consumer>
    );
  }
}

export default BaseContextElement;
