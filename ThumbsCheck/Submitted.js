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
    height: 200,
    width: 335
  },
});


var imgurArr = ['1cFZKU6.jpg', 'lpgzenr.jpg', 'kaSAiFO.jpg', 'O1u0Vad.jpg', '049aXNY.jpg', '0HUaYF9.gif',
'Rk21lRI.jpg', 'Y1v6cAQ.jpg', 'PG9ELxT.jpg', 'q4jGueU.jpg', 'ii3cS7L.jpg', 'NHv4DA4.jpg', 'LTuB2HH.gifv',
'wG4y01d.jpg', 'tpyiLGZ.jpg', 'AEQLyFV.jpg', 'zDZmbsA.jpg', 'SYWjy1l.jpg', 'VJirqYG.jpg', '4pKjgPg.jpg',
'22Je1dz.jpg', 'FbiW7PP.jpg'];

class Submitted extends Component{

  render(){
    return(
      <View style = {styles.container}>
        <Text style = {styles.description}>
          Thanks for Voting, {this.props.name}!
        </Text>
        <Image defaultSource={require('image!PuppyFive')} style={styles.image} source={{uri: 'http://i.imgur.com/' + imgurArr[Math.floor(Math.random() * imgurArr.length)]}}/>
      </View>
    );
  }
}

module.exports = Submitted;