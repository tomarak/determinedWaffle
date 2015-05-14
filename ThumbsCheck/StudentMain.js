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

var Submitted = require('./Submitted');

var styles = StyleSheet.create({
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
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  image: {
    width:100,
    height:100,
  },
  button: {
    marginTop: 10,
    marginBottom: 10
  }
});


var StudentMain = React.createClass({


  instructorTriggerState: function(){
    var url = "https://popping-torch-1564.firebaseio.com/trigger/val.json";
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
        isTriggered: responseData,
        });
      })
      .done();

  },


  vote: function(user, thumb) {
    var obj = {};
    obj[user] =thumb;

    var url = "https://popping-torch-1564.firebaseio.com/responses/" + user + ".json";
    console.log(url);
    return fetch(url  , {
    method: 'put',
    body: JSON.stringify(obj),
  }).then((res) => res.json())

    .then(this.props.navigator.push({
    title: "Thanks!",
    component: Submitted,
    passProps: {name: "Brian"}
    }));
  },

  getInitialState: function(){
    return {isTriggered: false}
  },

  componentDidMount: function(){
    this.instructorTriggerState()
    setInterval(this.instructorTriggerState, 2000)
  },

  render: function(){
    if(this.state.isTriggered){
      return this.renderThumbsCheckView();
    }
    else{
      return this.renderWaitingView();
    }
  },

  renderThumbsCheckView: function(){
    return(
      <View style = {styles.container}>
        <Text style = {styles.description}>
          Thumbs on your understanding of React Native!
        </Text>

        <TouchableHighlight onPress={this.vote.bind(this, "brian", "up")} underlayColor='green' activeOpacity='1' style={styles.button}>
          <Image source={require('image!ThumbsUp')} style={styles.image}/>
        </TouchableHighlight>
        
        <TouchableHighlight onPress={this.vote.bind(this, "paul", "middle")} underlayColor='gray' activeOpacity='1' style={styles.button}>
          <Image source={require('image!ThumbsMiddle')} style={styles.image}/>
        </TouchableHighlight>


        <TouchableHighlight onPress={this.vote.bind(this, "mary", "down")} underlayColor='red' activeOpacity='1' style={styles.button}>
          <Image source={require('image!ThumbsDown')} style={styles.image}/>
        </TouchableHighlight>


        <Text style = {styles.description}>
          Pick a thumb.
        </Text>
      </View>
    )
  },
  

  renderWaitingView: function(){
    return(
    <View style = {styles.container}>
        <Text style = {styles.description}>
          Waiting for thumbs check...
        </Text>
    </View>
    )
  }
})

module.exports = StudentMain;
