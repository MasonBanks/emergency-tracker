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

  handleChange = (value, stateKey) => {
    this.setState({
      [stateKey]: value,
    });
  }

  handleSignIn = (email, password) => login(email, password).then(data => data)


  render() {
    const { email, password } = this.state;
    const { router } = this.props;
    return (
      <GlobalContext.Consumer>
        {({ setAuth, setAdmin }) => (
          <Screen backgroundColor="#155e63" title="Login">
            <TextInput
              style={{
                width: 175,
                height: 30,
                borderColor: 'gray',
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
              }}
              placeholder="email"
              onChangeText={value => this.handleChange(value, 'email')}
              value={email}
              autoCapitalize="none"
            />
            <TextInput
              style={{
                width: 175,
                height: 30,
                borderColor: 'gray',
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
              }}
              placeholder="password"
              onChangeText={value => this.handleChange(value, 'password')}
              value={password}
              secureTextEntry
              autoCapitalize="none"
            />
            <Button
              onPress={() => {
                this.handleSignIn(email, password).then(
                  (data) => {
                    if (data) {
                      const object = data.val();
                      const user = object[Object.keys(data.val())[0]];
                      const { uid, isAdmin } = user;
                      setAdmin(isAdmin); // updates isAdmin in GlobalContext
                      setAuth(uid);
                    } else {
                      alert('Incorrect login details');
                    }
                  },
                );
              }}
              text="Sign in"
            />
            <Button
              onPress={() => {
                router.pop();
              }}
              text="↩Back"
            />
          </Screen>
        )}
      </GlobalContext.Consumer>
    );
  }
}
