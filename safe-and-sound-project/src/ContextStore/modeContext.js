import React, { Component } from 'react';
import { initialState } from './initialState';

const modeContext = React.createContext();

class ModeProvider extends Component {
  state = {
    ...initialState,
    setMode: () => { },
  }

  render() {
    return (
      <modeContext.Provider value={{ state: this.state }}>
        {this.props.children}
      </modeContext.Provider>
    );
  }
}

export {
  modeContext, ModeProvider,
};
