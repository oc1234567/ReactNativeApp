/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  TextInput
} from 'react-native';

class ReactNativeApp extends Component {
  render() {
    let pic = {uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};
    return (
      <Image source={pic} style={{width: 193, height: 110}} />
    );
  }
}

class Greeting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text>Yer, I am {this.props.name}!</Text>
    );
  }
}

class LotsOfGreetings extends Component {

  render() {
    return (
      <View style = {{alignItems: 'center'}}>
        <Greeting name='a'/>
        <Greeting name='a1'/>
        <Greeting name='a2'/>
        <Greeting name='a3'/>
      </View>
    )
  }
}

class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput style={{height: 40}} placeholder='Type here yo translate!' onChangeText={(text)=>this.setState({text})}/>
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && 'pizza').join(' ')}
        </Text>
      </View>
    );
  }
}

// class Bink extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { showText: true};
//
//     setInterval(() => {
//       this.setState(previousState => {
//         return { showText: !previousState.showText };
//       });
//     }, 1000);
//   }
//
//   render() {
//     let display = this.state.showText ? this.props.text : ' ';
//     return (
//       <Text>{display}</Text>
//     );
//   }
// }
//
// class BinkApp extends Component {
//   render() {
//     return (
//       <View></View>
//     )
//   }
// }

AppRegistry.registerComponent('ReactNativeApp', () => ReactNativeApp);
