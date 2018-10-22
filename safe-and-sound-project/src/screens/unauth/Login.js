import React from 'react';
import { TextInput } from 'react-native';
import { Consumer } from '../../ContextStore';

import { login } from '../../../api';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSignIn(email, password) {
    return login(email, password);
  }

  render() {
    return (
      <Consumer>
        {({ setAuth }) => (
          <Screen backgroundColor="#155e63" title="Login">
            <TextInput
              style={{
                width: 175,
                height: 30,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              placeholder="email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              autoCapitalize="none"
            />
            <TextInput
              style={{
                width: 175,
                height: 30,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              placeholder="password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              secureTextEntry
              autoCapitalize="none"
            />
            <Button
              onPress={() => {
                // this.handleSignIn(this.state.email, this.state.password)
                //   .then((data) => {
                //     if (data) {
                      setAuth(true);
                  //   } else {
                  //     console.log('incorrect login details');
                  //   }
                  // });
              }}
              text="Sign in"
            />
            <Button
              onPress={() => {
                this.props.router.pop();
              }}
              text="back"
            />
          </Screen>
        )}
      </Consumer>
    );
  }
}
