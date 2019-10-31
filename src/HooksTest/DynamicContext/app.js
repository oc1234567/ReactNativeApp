import React, { Component }from 'react'
import {
    View,
    Text,
    Button,
} from 'react-native'
import { MultiThemeContext, themes } from './theme-context'
import ThemeButton from './theme-button'

function ToorBar(props) {
    return (
        <ThemeButton onPress={props.changeTheme} title='Change Theme'/>
    )
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: themes.light,
        }
        this.toggleTheme = () => {
            this.setState((state) => ({
                theme: state.theme === themes.dark ? themes.light : themes.dark,
            }), () => {
                console.log(this.state.theme.name);
            })
        }
    }

    render() {
        return (
            <View>
                <MultiThemeContext.Provider value={this.state.theme}>
                    <ToorBar changeTheme={this.toggleTheme} />
                </MultiThemeContext.Provider>
            </View>
        )
    }
}

export default App
