import React, { Component } from 'react';
import { initialState } from './initialState';

const GlobalContext = React.createContext();

class GlobalProvider extends Component {
  state = {
    ...initialState,
    auth: {
      authenticated: false,
    },
    mode: {
      emergency: false,
    },
    isAdmin: {
      admin: false,
    },
  }

  setAuth = (authenticated) => {
    this.setState(() => ({
      auth: {
        authenticated,
      },
    }));
  };

  setMode = (emergency) => {
    this.setState(() => ({
      mode: {
        emergency,
      },
    }));
  };

  setAdmin = (admin) => {
    this.setState(() => ({
      isAdmin: {
        admin,
      },
    }));
  }

  render() {
    return (
      <GlobalContext.Provider value={{
        state: this.state, setAuth: this.setAuth, setMode: this.setMode, setAdmin: this.setAdmin,
      }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export {
  GlobalContext, GlobalProvider,
};
