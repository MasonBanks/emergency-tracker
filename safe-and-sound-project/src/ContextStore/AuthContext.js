import React, { Component } from 'react';
import { initialState } from './initialState';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    ...initialState,
    auth: {
      authenticated: false,
    },
  }

  setAuth = (authenticated) => {
    this.setState(() => ({
      auth: {
        authenticated,
      },
    }));
  };

  render() {
    return (
      <AuthContext.Provider value={{ state: this.state, setAuth: this.setAuth }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export {
  AuthContext, AuthProvider,
};
