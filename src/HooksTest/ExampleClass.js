import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Dimensions,
    DeviceEventEmitter
} from 'react-native'

const ThemeContext = React.createContext('light');

class App extends Component {
    render() {
        return (
            <ThemeContext.Provider value='dark'>
                <ToorBar />
            </ThemeContext.Provider>
        )
    }
}

function ToorBar(props) {
    return (
        <View>
            <ExampleComponentClass />
        </View>
    )
}

/**
 * 有状态组件类
 */
class ExampleComponentClass extends Component {
    static contextType = ThemeContext;
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            fruit: 'orange',
            ideas: [{content: 'Good Idea'}]
        }
    }

    render() {
        return (
        <View style={{height: 200, paddingTop: 50, backgroundColor: 'red'}}>
            <Text>Fruit: {this.state.fruit}</Text>
            {(() => {for (const idea of this.state.ideas) {
                return <Text>Idea Content: {idea.content}</Text>
            }})()}
            <Text>You clicked {this.state.count} times</Text>
            <Button onPress={() => this.setState({count: this.state.count + 1})} 
                    title='Chick Me'></Button>
            {/* 取到父级视图的值 */}
            <Text>Theme Context: {this.context}</Text>
            <Text>Ending</Text>
        </View>
        )
    }
}

export default App