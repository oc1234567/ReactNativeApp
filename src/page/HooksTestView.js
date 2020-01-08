import React, {Component, useState} from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
// import { Button } from '@ctrip/crn';
import ExampleHooks from '../HooksTest/ExampleHooks'
import ExampleClass from '../HooksTest/ExampleClass'
import ExampleContext from '../HooksTest/DynamicContext/app'
import ExampleMultiContext from '../HooksTest/ConsumMultipleContexts/app'
import ExampleReduxReactHook from "../HooksTest/ConsumMultipleContexts/testApp";
const global_name = 'This is Function Component Test Name';

export default class TestView extends Component {

    render() {
        return <View style={{flex: 1}}>
            <ExampleHooks></ExampleHooks>
            <ExampleClass></ExampleClass>
            <ExampleContext></ExampleContext>
            <ExampleMultiContext></ExampleMultiContext>
            <ExampleReduxReactHook></ExampleReduxReactHook>
        </View>
    }
} 

