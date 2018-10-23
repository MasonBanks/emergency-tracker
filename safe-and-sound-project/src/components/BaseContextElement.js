import React, { Component } from 'react';
import { GlobalContext } from '../ContextStore/globalContext';
import { Text } from 'react-native';

class BaseContextElement extends Component {
  componentDidMount() {
    console.log(this.props.context)
  }
  render() {
    return (
      <GlobalContext.Consumer>
        <Text>Hello</Text>
      </GlobalContext.Consumer>
    )
  }
}

export default BaseContextElement;
