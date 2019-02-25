/*
 * @Author: yjz 
 * @Date: 2019-01-25 10:05:08 
 * @Last Modified by: yjz
 * @Last Modified time: 2019-01-25 10:08:21
 */
import React, {Component} from 'react'
import {Text} from 'react-native'
import base from './base'

class ZhangBenCopyRight extends Component {
    render() {
        const copyright = base.getCopyRight();
        return <Text style={{fontWeight: 'bold', height: 44}}>{copyright}</Text>
    }
}

export default ZhangBenCopyRight