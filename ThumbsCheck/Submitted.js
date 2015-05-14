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

styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});

class Submitted extends Component{
  render(){
    return(
      <View style = {styles.container}>
        <Text style = {styles.description}>
          Thanks for Voting!
        </Text>
      </View>
    );
  }
}

module.exports = Submitted;