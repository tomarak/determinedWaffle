'use-strict';

var React = require('react-native');
var Welcome = require('./Welcome');

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});



class ThumbsCheckApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Welcome',
          component: Welcome,
        }}/>
    );
  }
}


React.AppRegistry.registerComponent('ThumbsCheck', function() { return ThumbsCheckApp });