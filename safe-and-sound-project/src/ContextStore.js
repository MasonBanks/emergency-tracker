import React from 'react';

const initialState = {
  auth: {
    authenticated: false,
  },
  mode: {
    emergency: false,
  },
};

const {
  Provider, Consumer, Idle, Emergency,
} = React.createContext({
  ...initialState,
  setAuth: () => { },
  setMode: () => { },
});

export {
  initialState, Provider, Consumer, Idle, Emergency,
};
