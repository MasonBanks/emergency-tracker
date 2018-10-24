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
      password: '',
    };
  }

  handleSubmit(fName, lName, email, password) {
    if (!/^[a-zA-Z]+$/.test(fName)) {
      return alert('Please insert a valid first name');
    } if (!/^[a-zA-Z]+$/.test(lName)) {
      return alert('Please insert a valid last name');
    } if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      return alert('Please insert a valid email address');
    } if (password.length < 6) {
      return alert('Password must have 6 characters or more');
    }
    return createUser(fName, lName, email, password).then((data) => {
      if (data) {
        console.log(data);
        alert('Account created!');
        this.props.router.pop();
      }
    });
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
                backgroundColor: '#FFFFFF',
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
                backgroundColor: '#FFFFFF',
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
                backgroundColor: '#FFFFFF',
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
                backgroundColor: '#FFFFFF',
              }}
              placeholder="password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              secureTextEntry
              autoCapitalize="none"
            />
            <Button
              onPress={() => {
                const [values] = Object.keys(this.state);
                this.handleSubmit(
                  this.state.fName,
                  this.state.lName,
                  this.state.email,
                  this.state.password,
                );
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
