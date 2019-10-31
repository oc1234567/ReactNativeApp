import React, { Component } from 'react'
import { 
    View,
    Button,
} from 'react-native'
import { MultiThemeContext } from './theme-context'

class ThemeButton extends Component {
    static contextType = MultiThemeContext
    render() {
        let props = this.props;
        /** 使用 this.context 可以取到父类传递的当前 MultiThemeContext 的值 **/
        // let theme = this.context;
        // return (
        //     <View>
        //          <View style={{backgroundColor: theme.background, height: 44}}></View>
        //         <Button {...props} />
        //     </View>           
        // )
        /** 或者使用当前 MultiThemeContext 的Consumer 获取 **/
        return (
            <View>
                <MultiThemeContext.Consumer>
                    {(theme) => (
                        <View style={{backgroundColor: theme.background, height: 44}}></View>
                    )}
                </MultiThemeContext.Consumer>
                <Button {...props} />
            </View>
        )
    }
}

export default ThemeButton;