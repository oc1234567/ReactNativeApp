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
    TextInput,
    ScrollView,
    FlatList,
    SectionList,
    Button

} from 'react-native';

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
    this.state = {text: '',};
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

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true};

    // setInterval(() => {
    //   this.setState(previousState => {
    //     return { showText: !previousState.showText };
    //   });
    // }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text style={this.props.style}>{display}</Text>
    );
  }
}

class MyAppText extends Component {
  // constructor() {
  //   super.constructor();
  // }
  render() {
    return <Text style={{color: 'red', fontWeight: 'bold'}}>{this.props.text}</Text>
  }
}

class ReactNativeApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Useless Multiline Placeholder',
            title: ''
        };
    };

    fetchNetwork = (enableCallback) => {
        fetch("http://bbs.reactnative.cn/api/category/3")
        .then((response) => response.json())
        .then((jsonData) => {
          this.setState({
            title: jsonData.topics[0].title,
          })
        })
        .catch((error) => {
              console.warn(error);
          });
    };
  render() {
    let pic = {uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};

    return (
      <View>
        <View style={{height: 20}}></View>
        <Image source={pic} style={{width: 193, height: 110}} />
        <View><Text style={{fontWeight: 'bold'}}>I am test<Text style={{color: 'red'}}> red text</Text></Text></View>
        <Blink style={styles.red} text="I love to blink" />
        <Blink style={styles.bigblue} text="Yes, blinking is so great" />
        <Blink style={[styles.red, styles.bigblue]} text="Why did they ever take this out of HTML" />
        <Blink style={[styles.bigblue, styles.red]} text="Look at me look at me look at me" />

        <View>
          <View style={{height: 20}}></View>
          <Text>
            <Text>First part and </Text>
            <Text>second part</Text>
          </Text>
          <View>
            <Text>First part and </Text>
            <Text>second part</Text>
          </View>
        </View>

        <View style={{height: 20}}></View>
        <View><MyAppText text='使用统一文本样式组件'/></View>

        {/* <View style={{height: 150, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{width: 100, height:30, backgroundColor: 'powderblue'}} />
          <View style={{width: 100, height:30, backgroundColor: 'skyblue'}} />
          <View style={{width: 100, height:30, backgroundColor: 'steelblue'}} />
        </View> */}

           {/* <View style={{padding: 10}}>
              <TextInput
                  style={{height: 40}}
                  placeholder="Type here to translate!"
                  onChangeText={(text) => this.setState({text})}
              />
              <Text style={{padding: 10, fontSize: 42}}>
                  {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
              </Text>
          </View> */}

          {/* <View>
              <ScrollView  style={{height: 150}}>
                  <Text>Scroll Me!</Text>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Text>哈哈</Text>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Image source={require('./flux.png')}></Image>
                  <Text>已经到底</Text>
              </ScrollView>
          </View> */}

           {/* <View>
              <FlatList style={{height: 150}} data={[{key: 'Devin'},{key: 'Jackson'},{key: 'James'},{key: 'Joel'},{key: 'John'},{key: 'Jillian'},{key: 'Jimmy'}]} renderItem={({item}) => <Text
                  style={styles.item}>{item.key}</Text>}/>
          </View> */}
          {/* <View>
              <SectionList sections={[{title: 'D', data: ['Devin']},{title: 'J', data:['Jackson', 'James', 'Jimmy', 'John']}]} renderItem={({item}) => <Text
                  style={styles.item}>{item}</Text>} renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}></SectionList>
          </View> */}

           <View>
              <Text>
                  {this.state.title}
              </Text>
              <Button onPress={this.fetchNetwork} title="提交" />
          </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: "blue",
  },
  red: {
    color: 'red',
  },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    sectionHeader: {
      paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247, 247, 247, 1.0)',
    }
});

AppRegistry.registerComponent('ReactNativeApp', () => ReactNativeApp);
