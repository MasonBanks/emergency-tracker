import React, { Component } from 'react';
import { initialState } from './initialState';

const GlobalContext = React.createContext();

class GlobalProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        authenticated: false,
      },
      mode: {
        emergency: false,
      },
      isAdmin: {
        admin: false,
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.appState !== null && prevProps.appState.dbEmergencyStatus !== this.props.appState.dbEmergencyStatus) {
      this.setMode(this.props.appState.dbEmergencyStatus);
    }
    if (this.state.auth.authenticated && (this.state.auth.authenticated !== prevState.auth.authenticated)) {
      this.props.getUserId(this.state.auth.authenticated);
    }
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
  }

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
