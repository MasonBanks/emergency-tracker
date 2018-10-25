import React from 'react';
import { View } from 'react-native';
import EasyRouter from 'react-native-easy-router';

import { GlobalContext } from './ContextStore/GlobalContext';

import Drawer from './components/Drawer';
import Sidenav from './components/Sidenav';
import Tabs from './components/Tabs';

import Intro from './screens/unauth/Intro';
import Login from './screens/unauth/Login';
import Register from './screens/unauth/Register';
import Home from './screens/auth/Home';
import EditZones from './screens/auth/EditZones';
import UserInfo from './screens/auth/UserInfo';
import Settings from './screens/auth/Settings';

const animations = {
  effect: [
    {
      opacity: 0,
      transform: [{ scale: 0 }],
    },
    {
      opacity: 1,
      transform: [{ scale: 1 }],
    },
    true,
  ],
};

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      router: undefined,
      animation: undefined,
      from: undefined,
      to: undefined,
    };
    this.drawer = React.createRef();
  }

  onStackChange = (stack) => {
    this.setState({
      animation: undefined,
      from: undefined,
      to: (stack[stack.length - 1] || {}).route,
    });
  };

  onBeforeStackChange = (animation, fromStack, toStack) => {
    const from = (fromStack[fromStack.length - 1] || {}).route;
    const to = (toStack[toStack.length - 1] || {}).route;
    this.setState({ animation, from, to });
  };

  setRouter = (router) => {
    this.setState({ router });
  };

  closeDrawer = () => {
    if (this.drawer.current.closeDrawer) {
      this.drawer.current.closeDrawer();
    }
  };

  openDrawer = () => {
    if (this.drawer.current.openDrawer) {
      this.drawer.current.openDrawer();
    }
  };

  render() {
    const {
      router, animation, from, to,
    } = this.state;
    return (
      <GlobalContext.Consumer>
        {({
          setAuth, setMode, state,
        }) => (
          <View style={{ backgroundColor: 'black', flex: 1 }}>
            {!state.auth.authenticated && (
            <EasyRouter
              routes={{
                Intro,
                Login,
                Register,
              }}
              initialRoute="Intro"
              animations={animations}
              onStackChange={this.onStackChange}
              onBeforeStackChange={this.onBeforeStackChange}
              router={(route) => {
                this.setRouter(route);
              }}
            />
            )}

            {state.auth.authenticated && (
            <Drawer
              renderNavigationView={() => (
                <Sidenav
                  state={state}
                  setAuth={setAuth}
                  setMode={setMode}
                  router={router}
                  closeDrawer={this.closeDrawer}
                />
              )}
              ref={this.drawer}
            >
              <Tabs
                state={state}
                router={router}
                openDrawer={this.openDrawer}
                from={from}
                to={to}
                transition={animation}
              >
                <EasyRouter
                  routes={{
                    Home,
                    EditZones,
                    Settings,
                    UserInfo,
                  }}
                  initialRoute="Home"
                  animations={animations}
                  onStackChange={this.onStackChange}
                  onBeforeStackChange={this.onBeforeStackChange}
                  router={(route) => {
                    this.setRouter(route);
                  }}
                />
              </Tabs>
            </Drawer>
            )}
          </View>
        )
        }
      </GlobalContext.Consumer>
    );
  }
}

export default Routes;
