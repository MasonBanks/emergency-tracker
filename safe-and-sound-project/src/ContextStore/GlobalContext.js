import React, { Component } from 'react';

const GlobalContext = React.createContext();

class GlobalProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {
        authenticated: false
      },
      mode: {
        emergency: false
      },
      isAdmin: {
        admin: false
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { appState, getUserId } = this.props;
    const { auth } = this.state;

    if (
      prevProps.appState !== null &&
      prevProps.appState.dbEmergencyStatus !== appState.dbEmergencyStatus
    ) {
      this.setMode(appState.dbEmergencyStatus);
    } else if (prevProps.appState === null) {
      this.setMode(appState.dbEmergencyStatus);
    }
    if (
      auth.authenticated &&
      auth.authenticated !== prevState.auth.authenticated
    ) {
      getUserId(auth.authenticated);
    }
  }

  setAuth = authenticated => {
    this.setState(() => ({
      auth: {
        authenticated
      }
    }));
  };

  setMode = emergency => {
    this.setState(() => ({
      mode: {
        emergency
      }
    }));
  };

  setAdmin = admin => {
    this.setState(() => ({
      isAdmin: {
        admin
      }
    }));
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          state: this.state,
          setAuth: this.setAuth,
          setMode: this.setMode,
          setAdmin: this.setAdmin
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export { GlobalContext, GlobalProvider };
