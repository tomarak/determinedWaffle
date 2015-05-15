'use strict'

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 46,
    textAlign: 'center',
    color: '#022200'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
    backgroundColor: '#CAE7C9',
    borderWidth: 20,
    borderColor: "#76BD72",
  },
  image: {
    // flex: 0.1,
    height: 200,
    width: 335
  },
});

class Submitted extends Component{
  render(){
    return(
      <View style = {styles.container}>
        <Text style = {styles.description}>
          Thanks for Voting, {this.props.name}!
        </Text>
        <Image source={require('image!PuppyFive')} style={styles.image}/>
      </View>
    );
  }
}

module.exports = Submitted;