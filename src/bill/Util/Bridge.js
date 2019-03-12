'use strict';

import React from 'react-native';

var caller = React.NativeModules.RNNativeCall;

export default class Bridge {
	/**
	* 调用 native 接口
	* 带回调函数.
	*
	* @method callNativeWithCallback
	* @brief 调用 native 接口带回调函数
	* @param {String} moduleName native模块名
	* @param {String} functionName native函数名
	* @param {JSON} parameters 参数
	* @param {Function} callback 回调
	* @example
	* ```
	* import Bridge from './Bridge.js'
	* Bridge.callNativeWithCallback("Toast", "showToastWithText", {"text":text}, function () {
			//callback
		});
	* ```
	*/
	static callNativeWithCallback(moduleName, functionName, parameters, callback) {
		caller.callNativeWithCallback(moduleName, functionName, parameters, callback);
	}

	/**
	* 调用 native 接口
	* 不带回调函数.
	*
	* @method callNative
	* @brief 调用 native 接口不带回调函数.
	* @param {String} moduleName native模块名
	* @param {String} functionName native函数名
	* @param {JSON} parameters 参数
	* @example
	* ```
	* import Bridge from './Bridge.js'
	* Bridge.callNative("Toast", "showToastWithText", {"text":text});
	* ```
	*/
	static callNative(moduleName, functionName, parameters) {
		caller.callNative(moduleName, functionName, parameters);
	}
}