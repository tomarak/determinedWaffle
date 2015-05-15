'use strict'

var React = require('react-native');
var StudentMain = require('./StudentMain');
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
        console.log(info.token);
        


        var url = 'https://graph.facebook.com/v2.3/'+ info.userId+ '?access_token='+info.token;
        //fetch userdata from fb
        return fetch(url).then((res) =>res.json())
          .then((data) => {
            console.log(data);
            this.setState({result: data.name});
          })
          .then(this.props.navigator.push({
            title: "Thanks!",
            component: StudentMain,
            passProps: {name: "Brian"}
          }));
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
