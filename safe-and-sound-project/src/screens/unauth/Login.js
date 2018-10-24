import React from 'react';
import { TextInput } from 'react-native';
import { GlobalContext } from '../../ContextStore/GlobalContext';

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
    return login(email, password)
      .then(data => data);
  }

  render() {
    return (
      <GlobalContext.Consumer>
        {({ setAuth, setAdmin, state }) => (
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
                this.handleSignIn(this.state.email, this.state.password)
                  .then((data) => {
                    if (data) {
                      console.log('!!!!!!!!!!!');
                      const object = data.val();
                      const user = object[Object.keys(data.val())[0]];
                      const { uid, isAdmin } = user;
                      setAdmin(isAdmin); // updates isAdmin in GlobalContext
                      setAuth(uid);
                    } else {
                      console.log('incorrect login details');
                    }
                  });
              }}
              text="Sign in"
            />
            <Button
              onPress={() => {
                this.props.router.pop();
              }}
              text="↩Back"
            />
          </Screen>
        )}
      </GlobalContext.Consumer>
    );
  }
}
