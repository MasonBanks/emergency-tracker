import React, { Component } from 'react';
import { initialState } from './initialState';

const ModeContext = React.createContext();

class ModeProvider extends Component {
  state = {
    ...initialState,
    mode: {
      emergency: false
    },
  }

  setMode = (emergency) => {
    this.setState(() => ({
      mode: {
        emergency
      }
    }));
  };

  render() {
    return (
      <ModeContext.Provider value={{ state: this.state, setMode: this.setMode }}>
        {this.props.children}
      </ModeContext.Provider>
    );
  }
}

export {
  ModeContext, ModeProvider,
};
