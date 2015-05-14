
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;


var Welcome = React.createClass({


    vote(user, thumb) {
    var thumb = "up"
    var user = "github125";
    var obj = {};
    obj[user] =thumb;
    var url = "https://popping-torch-1564.firebaseio.com/responses/" + user + ".json";
    console.log(url);
    return fetch(url  , {
    method: 'put',
    body: JSON.stringify(obj)
  }).then((res) => res.json());

  },

  
  login() {

    
    var obj = {github:73555}
    return fetch('https://torrid-inferno-5602.firebaseio.com/responses.json'  , {
      method: 'post',
      body: JSON.stringify(obj)
    }).then((res) => res.json());


  },


  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Thumbs Check!
        </Text>
        <Text style={styles.instructions}>
          Login through GitHub
        </Text>
        <Text style={styles.instructions}>
          Get Voting
        </Text>
        <TouchableHighlight style={styles.button} onPress={this.vote}

            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>


     
    );
  }
});

var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
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
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = Welcome;
