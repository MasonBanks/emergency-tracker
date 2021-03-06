import React from 'react';
import { Animated, View } from 'react-native';
import easingFunctions from 'react-native-animatable-promise/easing';
import baseStyles from './styles';
import Button from './Button';

const styles = {
  ...baseStyles,
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#f7faff',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  button: {
    ...baseStyles.button,
    marginTop: 10,
  },
  buttonText: {
    ...baseStyles.text,
    fontSize: 16,
  },
  underline: {
    height: 5,
    width: 1,
    backgroundColor: '#aa530e',
    position: 'absolute',
    bottom: 0,
    left: -0.5,
  },
  tipText: {
    marginLeft: 10,
    fontSize: 13,
    color: 'rgba(0,0,0,0.4)',
    flex: 2,
    flexWrap: 'wrap',
  },
  componentText: {
    flex: 1,
    marginBottom: 0,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 16,
    textAlign: 'left',
  },
  textWrap: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

const screenAnimation = { type: 'effect', duration: 900, easing: 'ease-in-out-back' };

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      layouts: {},
    };
  }

  componentDidUpdate(prevProps) {
    const { animation } = this.state;
    const { from, to, transition: { easing, duration } = {} } = this.props;
    if (from && to && from !== to && (from !== prevProps.from || to !== prevProps.to)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ animation: new Animated.Value(0) }, () => {
        Animated.timing(animation, {
          toValue: 1,
          easing: easingFunctions[easing],
          duration,
          useNativeDriver: true,
        }).start();
      });
    }
  }

  onLayout = (screen, e) => {
    const {
      nativeEvent: { layout },
    } = e;
    this.setState(oldState => ({
      layouts: {
        ...oldState.layouts,
        [screen]: layout,
      },
    }));
  };

  getPos = (screen) => {
    const { layouts } = this.state;
    return layouts[screen] || { x: -10000, width: 0 };
  };

  pressMenu = () => {
    this.props.openDrawer();
  };

  goto = async (screen) => {
    const { router: { push } = {} } = this.props;
    await push[screen]({}, screenAnimation);
  };

  render() {
    const { children, from, to } = this.props;
    const { animation } = this.state;

    const fromPos = this.getPos(from);
    const toPos = this.getPos(to);
    const translateX = !from || from === to
      ? toPos.x + toPos.width / 2 || -10000
      : animation.interpolate({
        inputRange: [0, 1],
        outputRange: [fromPos.x + fromPos.width / 2, toPos.x + toPos.width / 2],
      });
    const scaleX = !from || from === to
      ? toPos.width || 0
      : animation.interpolate({
        inputRange: [0, 1],
        outputRange: [fromPos.width, toPos.width],
      });
    const contextState = this.props.state;

    return (
      <View style={styles.container}>
        {children}
        <View style={styles.header}>
          <View style={styles.tabs}>
            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              disabled={to === 'Home'}
              activeOpacity={0.5}
              onPress={() => {
                this.goto('Home');
              }}
              onLayout={(layout) => {
                this.onLayout('Home', layout);
              }}
              text="Home"
            />
            {contextState.isAdmin.admin
              && (
                <Button
                  style={styles.button}
                  textStyle={styles.buttonText}
                  disabled={to === 'EditZones'}
                  activeOpacity={0.5}
                  onPress={() => {
                    this.goto('EditZones');
                  }}
                  onLayout={(layout) => {
                    this.onLayout('EditZones', layout);
                  }}
                  text="Edit Zones"
                />
              )}

            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              disabled={to === 'UserInfo'}
              activeOpacity={0.5}
              onPress={() => {
                this.goto('UserInfo');
              }}
              onLayout={(layout) => {
                this.onLayout('UserInfo', layout);
              }}
              text="Users"
            />
            <Button
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={this.pressMenu}
              text="MENU"
            />
          </View>
          <View>
            <Animated.View
              style={[styles.underline, { transform: [{ translateX }, { scaleX }] }]}
            />
          </View>
        </View>
      </View>
    );
  }
}
