/*
 * @Author: yjz 
 * @Date: 2019-01-25 09:57:13 
 * @Last Modified by: yjz
 * @Last Modified time: 2019-01-25 10:01:14
 */
import React, {Component} from 'react'
import {Text} from 'react-native'
import base from './base'

class ZhangBenPlan extends Component {
    render() {
        const plan = base.getPlanMoney();
        return <Text style={{fontWeight: 'bold', height: 44}}>{plan}</Text>
    }
}

export default ZhangBenPlan