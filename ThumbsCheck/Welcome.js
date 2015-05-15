'use strict'
  
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var NativeModules = require('NativeModules');

var FacebookLoginManager = NativeModules.FacebookLoginManager;

var Welcome = React.createClass({
  getInitialState() {
    console.log('init');
    return {
      result: '...'
    }
  },

  componentDidMount() {
    var self = this;
  },

  login() {
    console.log('loginer');
    FacebookLoginManager.newSession((error, info) => {

      console.log('info', info);
      if (error) {
        console.log(error, 'err');
        this.setState({result: error});
      } else {
        console.log(info);
        this.setState({result: info});
      }
    });
  },

  render() {
    console.log('lolel');
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.login}>
          <Text style={styles.welcome}>
            Facebook Login
          </Text>
        </TouchableHighlight>
        <Text style={styles.instructions}>
          {this.state.result}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
module.exports = Welcome;
