import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,.4)',
    padding: 10,
    margin: 20,
    marginBottom: 0,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',

  },
  logo: {
    width: width - 100,
    paddingBottom: 0,
  }
};


export default styles;
