import React from 'react';
import * as api from '../api';

const initialState = {
  auth: {
    authenticated: false,
  }
};

const {
  Provider, Consumer
} = React.createContext({
  ...initialState,
  setAuth: () => { }
});

export {
  initialState, Provider, Consumer
};
