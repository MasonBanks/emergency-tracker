import React from 'react';
import { Consumer } from '../../ContextStore';
import { TextInput } from 'react-native'

import Screen from '../../components/Screen';
import Button from '../../components/Button';

export default ({ router }) => (
  <Consumer>
    {({ setAuth }) => (
      <Screen backgroundColor="#155e63" title="Login">
        <TextInput style={{
          width: 175,
          height: 30,
          borderColor: 'gray',
          borderWidth: 1
        }}
        />
        <Button
          onPress={() => {
            setAuth(true);
          }}
          text="Sign in"
        />
        <Button
          onPress={() => {
            router.pop();
          }}
          text="back"
        />
      </Screen>
    )}
  </Consumer>
);
