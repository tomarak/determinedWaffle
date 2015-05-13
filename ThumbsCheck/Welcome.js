
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var Firebase = require('firebase-react-native');

var fb = new Firebase("https://popping-torch-1564.firebaseio.com");


var Welcome = React.createClass({

  // getInitialState: function(){
  //   return {}
  // },
  // componentDidMount: function(){
  //   var ref = new Firebase("https://popping-torch-1564.firebaseio.com/trigger");
  //   // ref.on("value",function(snapshot){
  //   //   this.setState({val: 5});
  //   // }.bind(this));
  //   ref.on(function(){
  //     console.log("here");
  //     this.setState({val: 5});
  //     console.log(this.setState)
  //   }, 4);

  // },

  // componentWillMount: function() {
  // var ref = new Firebase("https://popping-torch-1564.firebaseio.com/items/");
  // this.bindAsArray(ref, "items");



  // },

  // componentWillMount: function() {
  //   var ref = new Firebase("https://popping-torch-1564.firebaseio.com/users/");
  //   this.bindAsArray(ref, "users");
  // },

  login() {
    console.log("here");
    console.log("this", this);
    fb.set({name: "hello"});
    // this.setState({name: "Luke"});
    // console.log(this.setState);
    // this.componentWillMount();
    // this.ref["users"].push({name: "Bitsy"});
    // fb.save({name: "Bitsy"});
    // console.log("fb", fb);
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
        <TouchableHighlight style={styles.button} onPress={this.login}

            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>


      // <View>
      //   {
      //     Object.keys(this.state).map(k=>{
      //       return <Text>{this.state[k].title} - {this.state[k].author}</Text>
      //     })
      //   }
      // </View>
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
