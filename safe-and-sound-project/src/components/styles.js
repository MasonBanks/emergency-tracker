import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,.4)',
    padding: 10,
    margin: 20,
    marginBottom: 0,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  logo: {
    width,
    height: '50%',
    paddingBottom: 0,
  },
};


export default styles;
