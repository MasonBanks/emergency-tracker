import React, { Component } from 'react';
import { GlobalContext } from '../ContextStore/globalContext';

const BaseContextElement = () => {
  return (
    <GlobalContext.Consumer>
      {/* {({
          setAuth, setMode, setAdmin, state,
        }) => (
          <Button />
        )} */}
    </GlobalContext.Consumer>
  );
}

export default BaseContextElement;
