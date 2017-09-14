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
        {/* <View><Text style={{fontWeight: 'bold'}}>I am test<Text style={{color: 'red'}}> red text</Text></Text></View> */}
        {/* <Blink style={styles.red} text="I love to blink" />
        <Blink style={styles.bigblue} text="Yes, blinking is so great" />
        <Blink style={[styles.red, styles.bigblue]} text="Why did they ever take this out of HTML" />
        <Blink style={[styles.bigblue, styles.red]} text="Look at me look at me look at me" /> */}

        {/* <View>
          <View style={{height: 20}}></View>
          <Text>
            <Text>First part and </Text>
            <Text>second part</Text>
          </Text>
          <View>
            <Text>First part and </Text>
            <Text>second part</Text>
          </View>
        </View> */}

        {/* <View style={{height: 20}}></View>
        <View><MyAppText text='使用统一文本样式组件'/></View> */}

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

           {/* <View>
              <Text>
                  {this.state.title}
              </Text>
              <Button onPress={this.fetchNetwork} title="提交" />
          </View> */}

          <View style={styles.container}>
            <Text style={styles.brifeText}>简介</Text>
            <View style={styles.moviewBrifeContatiner}>
              <Image style={styles.movieImage} source={{uri:'http://pic4.qiyipic.com/image/20161222/d2/59/a_100039885_m_601_180_236.jpg"'}}></Image>
              <View style={styles.movieInfo}>
                <View style={styles.movieDirector}>
                  <Text style={styles.movieDirectorTitle}>导演：</Text>
                  <Text style={styles.movieDirectorText}>路飞</Text>
                </View>
                <View style={styles.movieActor}>
                  <Text style={styles.movieActorTitle}>主演：山下智久</Text>
                </View>
                <View style={styles.movieType}>
                  <Text style={styles.movieTypeTitle}>类型：日漫，热血</Text>
                </View>
                <View style={styles.movieArea}>
                  <Text style={styles.movieAreaTitle}>地区：日本</Text>
                </View>
                <View style={styles.movieYear}>
                  <Text style={styles.movieYearTitle}>年代：</Text>
                  <Text style={styles.movieYearText}>2001</Text>
                </View>
                <View style={styles.movieSource}>
                  <View style={styles.movieSource2}>
                    <Text style={styles.movieSourceTitle}>评分：</Text>
                    <Text style={styles.movieSourceText}>9.1</Text>
                  </View>
                  {/* <Button onPress={this._onPress.bind(this)} style={styles.movieSourceButton} color='#ff9313' accessibilityLabel='Learn more about purple'>
                    我要评分
                  </Button> */}
                </View>
              </View>
              <View style={styles.chileFlex}>
                <Text style={styles.detailText}>有个男人他拥有世界上切财富、名望和权势，他就是「海盗王」高路德•罗杰。 在临死前说过这样一句话：让全世界的人都奔向大海 「想要我的财宝吗？想要的话全就拿去吧……！你们去找吧！我把世界上的一切都放在那里了」。 后来世界上的人们将这个宝藏称作“一个大秘宝”（One Piece），许多人为了争夺大秘宝One Piece，无数海盗扬起旗帜，互相斗争，后来就形成了「大海盗时代」。 主角蒙奇•D•路飞在遥远的路途上找寻着志同道合的伙伴，携手共进「伟大航线」，目标当上「海盗王」。</Text>
              </View>
            </View>
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
    },
    container: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: '#fafafa',
    },
    brifeText: {
      fontSize: 15,
      margin: 12,
      color: '#323232',
    },
    moviewBrifeContatiner: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 6,
      marginRight: 6,
      marginTop: 4,
    },
    movieImage: {
      width: 100,
      aspectRatio: 0.758,
      backgroundColor: '#ff0000',
      flex: 1,
    },
    movieInfo: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flex: 1,
      marginLeft: 0,
    },
    movieDetail: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginLeft: 12,
    },
    movieDirector: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    movieDirectorTitle: {
      fontSize: 11,
      color: '#646464',
    },
    movieDirectorText: {
      fontSize: 11,
      color: '#646464',
    },
    movieActor: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 5,
    },
    movieActorTitle: {
      fontSize: 11,
      color: '#646464',
    },
    movieActorText: {
      fontSize: 11,
      color: '#646464',
    },
    movieType: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 5,
    },
    movieTypeTitle: {
      fontSize: 11,
      color: '#646464',
    },
    movieTypeText: {
      fontSize: 11,
      color: '#646464',
    },
    movieArea: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 5,
    },
    movieAreaTitle: {
      fontSize: 11,
      color: '#646464',
    },
    movieAreaText: {
      fontSize: 11,
      color: '#646464',
    },
    movieYear: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 5,
    },
    movieYearTitle: {
      fontSize: 11,
      color: '#646464',
    },
    movieYearText: {
      fontSize: 11,
      color: '#646464',
    },
    movieSource: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexGrow: 1,
    },
    movieSource2: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 5,
    },
    movieSourceTitle: {
      fontSize: 11,
      color: '#646464',
    },
    movieSourceText: {
      fontSize: 11,
      color: '#646464',
    },
    movieSourceButton: {
      fontSize: 13,
      color: '#fff',
    },
    detailText: {
      fontSize: 11,
      marginLeft: 12,
      marginRight: 12,
      marginTop: 16,
      marginBottom: 16,
      color: '#646464',
      flexShrink:1,
    },
    chileFlex: {
        //width: 100,
        backgroundColor: '#00ff00',
        flex: 2,
    },
});

AppRegistry.registerComponent('ReactNativeApp', () => ReactNativeApp);
