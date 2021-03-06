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
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#CBE7C9',
    containerBackgroundColor: 'transparent'
  },
  container: {
    padding: 70,
    alignItems: 'center',
    backgroundColor: '#0A5606',
    borderColor: '#76BD72',
    borderWidth: 15,
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
  },
  buttonContainer: {
    width: 100,
    height: 100,
    marginBottom: 25,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  }
});


var StudentMain = React.createClass({

  getThumbsCheckState: function(){
    var url = "https://popping-torch-1564.firebaseio.com/trigger/val.json";
    fetch(url)
      .then((response) => response.json())
      .then((state) => {
        this.setState({ thumbsCheckTriggered: state });
      })
      .done();
  },

  getQuizState: function(){
    var url = "https://popping-torch-1564.firebaseio.com/quizTrigger/val.json";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.getQuiz(data)
      })
      .done();
  },

  getQuiz: function(quizstate){
    var url = "https://popping-torch-1564.firebaseio.com/newQuiz/quiz.json";
    if(quizstate){
      fetch(url)
      .then((response) => response.json())
      .then((quiz) => {
        this.setState({quiz: quiz})
      })
      .done()
    }
     this.setState({ quizTriggered: quizstate })
  },

  vote: function( thumb) {
    var obj = {};
    var user = this.props.name;
    obj[user] =thumb;

    var url = "https://popping-torch-1564.firebaseio.com/responses/" + user + ".json";
    return fetch(url, {
      method: 'put',
      body: JSON.stringify(obj),
      }).then((res) => res.json())
        .then(this.props.navigator.push({
        title: "Thanks!",
        component: Submitted,
        passProps: {name: user}
        }));
  },

  voteQuiz: function(choice){
    var obj = {};
    var user = this.props.name;
    obj[user] =choice;

    var url = "https://popping-torch-1564.firebaseio.com/quizResponses/" + user + ".json";
    return fetch(url, {
      method: 'put',
      body: JSON.stringify(obj),
      }).then((res) => res.json())
        .then(this.props.navigator.push({
        title: "Thanks!",
        component: Submitted,
        passProps: {name: user}
        }));
  },

  getInitialState: function(){
    console.log(this.props);
    return {thumbsCheckTriggered: false,
      quizTriggered: false,
      quiz: []}
  },

  componentDidMount: function(){
    this.getThumbsCheckState()
    this.getQuizState()

    setInterval(this.getThumbsCheckState, 2000)
    setInterval(this.getQuizState, 2000)
  },

  render: function(){
    if(this.state.thumbsCheckTriggered){
      return this.renderThumbsCheckView();
    }
    else if(this.state.quizTriggered){
      return this.renderQuizView();
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

        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={this.vote.bind(this, "up")} underlayColor='transparent' activeOpacity='0.70' style={styles.button}>
            <Image source={require('image!ThumbsUp')} style={styles.image}/>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={this.vote.bind(this, "middle")} underlayColor='transparent' activeOpacity='0.70' style={styles.button}>
            <Image source={require('image!ThumbsMiddle')} style={styles.image}/>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={this.vote.bind(this, "down")} underlayColor='transparent' activeOpacity='0.70' style={styles.button}>
            <Image source={require('image!ThumbsDown')} style={styles.image}/>
          </TouchableHighlight>
        </View>


        <Text style = {styles.description}>
          Pick a thumb.
        </Text>
      </View>
    )
  },

  renderQuizView: function(){
    if(this.state.quiz.choices ){
      var self = this;
      var choices = this.state.quiz.choices.map(function(choice, index){
          return ( 
            <Text style = {styles.description} onPress= {self.voteQuiz.bind(self, index)}>
              {choice}
            </Text>
            )
        })
  };
    return (
      <View style = {styles.container}>
        <Text style = {styles.description}>
            {this.state.quiz.question}
        </Text>

        {choices}
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
