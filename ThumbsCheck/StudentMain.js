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
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
    containerBackgroundColor: 'transparent'
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FEFEFF',
    borderColor: '#5488B2',
    borderWidth: 5,

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
  check: {
    width: 40,
    height: 40,
    padding: 10
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
  },
  quizContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"

  },
  quizOuterContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
    alignItems: 'flex-start',
    // backgroundColor: '#0A5606',
    borderColor: '#5488B2',
    borderWidth: 5,
    marginTop: 65,
  },
  quizInnerContainer:{
    alignSelf:'center'
  },
  quizText: {
    padding: 20,
    fontSize: 20,
    color: "#1C1C1A",
    fontWeight: 'bold'
  },
  quizQuestion: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 30,
    textAlign: 'left',
    containerBackgroundColor: 'transparent',
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
          Ready, set, thumb!
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
      </View>
    )
  },

  renderQuizView: function(){
    if(this.state.quiz.choices ){
      var self = this;
      var choices = this.state.quiz.choices.map(function(choice, index){
          return ( 
            <View style = {styles.quizContainer} >
              <TouchableHighlight onPress={self.voteQuiz.bind(self, index)} underlayColor='transparent' activeOpacity='0.70' style={styles.button}>
                <Image source={require('image!Check')} style={styles.check}/>
              </TouchableHighlight>
              <Text style = {styles.quizText} onPress= {self.voteQuiz.bind(self, index)}>
                {choice}
              </Text>
            </View>
            )
        })
  };
    return (
      <View style = {styles.quizOuterContainer}>
        <Text style = {styles.quizQuestion}>
            {this.state.quiz.question}
        </Text>
        <View style = {styles.quizInnerContainer}>
          {choices}
        </View>
      </View>
      )
    },
  
  renderWaitingView: function(){
    return(
    <View style = {styles.container}>
        <Text style = {styles.description}>
          Holster that thumb, cowboy!
        </Text>
    </View>
    )
  }
})

module.exports = StudentMain;
