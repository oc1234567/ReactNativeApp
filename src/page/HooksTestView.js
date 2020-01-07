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

// const withUser = WrappedComponent => (name, props) => <WrappedComponent user={name} {...props} />

// const UserPage = props => (
// <View style={{paddingTop: 200}} class="user-container">
//     {props.user && <Text>My name is {props.user}!</Text>}
//     {props.isEnable && <Text>This is prop: {props.isEnable}</Text>}
//     <Text>Ending</Text>
// </View>
// );

// let  view = withUser(UserPage)('aa', {isEnable: 'eee'})

// let view = ExampleHooks();
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

