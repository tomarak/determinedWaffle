'use strict'

var React = require('react-native');
var StudentMain = require('./StudentMain');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} = React;

var NativeModules = require('NativeModules');
var FacebookLoginManager = NativeModules.FacebookLoginManager;

var Welcome = React.createClass({
  getInitialState() {
    return {
      result: 'No User Name'
    }
  },

  componentDidMount() {
    var self = this;
  },

  login() {
    if(this.state.result === 'No User Name' || this.state.result === 'Canceled'){
      FacebookLoginManager.newSession((error, info) => {

        if (error) {
          console.log(error, 'err');
          this.setState({result: error});
        } else {

          var url = 'https://graph.facebook.com/v2.3/'+ info.userId+ '?access_token='+info.token;
          
          return fetch(url).then((res) =>res.json())
            .then((data) => {
              this.setState({result: data.name});
            })
            .then(()=>{
              this.redirToPolling();
            });
        }
      });
    } else {
      this.redirToPolling();
    }
  },

  logout() {
    this.setState({result: 'No User Name'});
  },

  redirToPolling() {
      this.props.navigator.push({
        title: "Polling Place",
        component: StudentMain,
        passProps: {name: this.state.result}
      })
  },

  renderLoginView() {
    return(
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableHighlight onPress={this.login} underlayColor='transparent' activeOpacity='0.9'>
            <Image source={require('image!FacebookLoginButton')} style={styles.image}/>
        </TouchableHighlight>
        </View>
        <Text style={styles.instructions}>
          {this.state.result}
        </Text>
      </View>
    )
  },

  renderUserView() {
    return(
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableHighlight onPress={this.redirToPolling} underlayColor='transparent' activeOpacity='0.9'>
          <Text style={styles.instructions}>
            Return to the Polls
          </Text>
        </TouchableHighlight>
        </View>
        <Text style={styles.instructions}>
          {this.state.result}
        </Text>

        <View style={styles.button}>
          <TouchableHighlight onPress={this.logout} underlayColor='transparent' activeOpacity='0.9'>
            <Text style={styles.instructions}>
            Logout
            </Text>
        </TouchableHighlight>
        </View>
      </View>
    )
  },

  render() {
    if (this.state.result !== "Canceled" && this.state.result !== "No User Name"){
      return this.renderUserView();
    } else {
      return this.renderLoginView();
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A5606',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth:1,
    borderRadius: 10
  },
  image: {
  }
});
module.exports = Welcome;
