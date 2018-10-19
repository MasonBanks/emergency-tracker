import React from 'react';

const initialState = {
  auth: {
    authenticated: false,
  },
  mode: {
    emergency: false
  }
};

const {
  Provider, Consumer,
} = React.createContext({
  ...initialState,
  setAuth: () => { },
});

export {
  initialState, Provider, Consumer,
};
