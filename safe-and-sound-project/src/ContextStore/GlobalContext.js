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
    const { appState, getUserId } = this.props;
    const { auth } = this.state;
    if (prevProps.appState !== null && prevProps.appState.dbEmergencyStatus !== appState.dbEmergencyStatus) {
      this.setMode(appState.dbEmergencyStatus);
    }
    if (auth.authenticated && auth.authenticated !== prevState.auth.authenticated) {
      getUserId(auth.authenticated);
    }
  }

  setAuth = (authenticated) => {
    this.setState(() => ({
      auth: {
        authenticated,
      },
    }), () => {
      console.log(this.state.auth);
    });
  };

  setMode = (emergency) => {
    this.setState(() => ({
      mode: {
        emergency,
      },
    }), () => {
      console.log(this.state.mode);
    });
  }

  setAdmin = (admin) => {
    this.setState(() => ({
      isAdmin: {
        admin,
      },
    }), () => {
      console.log(this.state.isAdmin);
    });
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
