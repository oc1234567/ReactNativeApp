/*
 * @Author: yjz 
 * @Date: 2019-01-25 09:50:31 
 * @Last Modified by: yjz
 * @Last Modified time: 2019-03-11 15:26:33
 */
// import {storage} from './rnstorage'
import Bridge from './Bridge';

export const Storage = {

    save(params) {
        // storage.save({
        //     key: params.key, // 注意:请不要在key中使用_下划线符号!
        //     data: params.value,
        //     expires: null // 如果不指定过期时间，则会使用defaultExpires参数 如果设为null，则永不过期
        // })
        Bridge.callNative("Storage", "save", params);
        // storage.save(params.key, params.value)
    },

    load(params, callback) {
        // storage.load(params.key, callback)
        Bridge.callNativeWithCallback("Storage", "load", params, callback);
    },

    remove(params) {
        // storage.remove({key: params.key});
        // storage.remove(params.key)
        Bridge.callNative("Storage", "remove", params);
    },

    getAllKeyValues(params, callback) {
        
    }
}