/*
 * @Author: yjz 
 * @Date: 2019-02-20 15:39:54 
 * @Last Modified by: yjz
 * @Last Modified time: 2019-02-20 15:51:31
 */
//账本余额
import React, {Component} from 'react'
import {View, Text}from 'react-native'

class ZhangBenHomeBalanceView extends Component {
    
    render() {
        return (
        <View>
            <Text>{`当前余额：${this.props.balance}`}</Text>
        </View>
        )
        
    }
}

export default ZhangBenHomeBalanceView
