import React, { Component } from 'react';
import { initialState } from './initialState';

const authContext = React.createContext();

class AuthProvider extends Component {
  state = {
    ...initialState,
    setAuth: () => { },
  }

  render() {
    return (
      <authContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </authContext.Provider>
    );
  }
}

export {
  initialState, authContext, AuthProvider
};
