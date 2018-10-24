import React from 'react';
import { TextInput } from 'react-native';
import { GlobalContext } from '../../ContextStore/GlobalContext';

import { createUser } from '../../../api';

import Screen from '../../components/Screen';
import Button from '../../components/Button';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      lName: '',
      email: '',
      password: ''
    };
  }

  handleSubmit(fName, lName, email, password) {
    return createUser(fName, lName, email, password)
      .then((data) => {
        if (data) {
          console.log(data)
          alert('Account created!')
          this.props.router.pop()
        }
      })
  }

  render() {
    return (
      <GlobalContext.Consumer>
        {({ setAuth, setAdmin, state }) => (
          <Screen backgroundColor="#155e63" title="Create New Account">
            <TextInput
              style={{
                width: 175,
                height: 30,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              placeholder="First name"
              onChangeText={fName => this.setState({ fName })}
              value={this.state.fName}
              autoCapitalize="words"
            />
            <TextInput
              style={{
                width: 175,
                height: 30,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              placeholder="Last name"
              onChangeText={lName => this.setState({ lName })}
              value={this.state.lName}
              autoCapitalize="words"
            />
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
                const [values] = Object.keys(this.state)
                this.handleSubmit(this.state.fName, this.state.lName, this.state.email, this.state.password);
              }}
              text="Register"
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
