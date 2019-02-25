/*
 * @Author: yjz 
 * @Date: 2019-01-25 09:50:31 
 * @Last Modified by: yjz
 * @Last Modified time: 2019-02-20 15:57:25
 */
import {storage} from './rnstorage'

export const Storage = {
    /**
     * 存数据， key-value 形式
     *
     * @method save
     * @brief 存数据
     * @param {JSON} params
     * params 包含以下字段：
     *          key: {String} 存储的key<br/>
     *          value: {String}  key对应的value <br/>
     *          domain: {String} 可选，数据存储的域，传入bu名，防止各个bu间存了相同key的数据时错乱，不传则默认存在 common 区域<br/>
     *          expires: {number} 可选，存储数据的有效期，单位为秒，如果过了有效期则数据取到为空，默认有效期永久，除非用户手动清除了缓存<br/>
     *          isSecret: {bool} 可选，是否加密储存，默认false，若为true则取数据时也需要传isSecret<br/>
     * @example
     * ```
     * Storage.save({key:"abckey", value:"abcvalue", domain:"hotel"});
     * ```
     */
    save(params) {
        // storage.save({
        //     key: params.key, // 注意:请不要在key中使用_下划线符号!
        //     data: params.value,
        //     expires: null // 如果不指定过期时间，则会使用defaultExpires参数 如果设为null，则永不过期
        // })
        storage.save(params.key, params.value)
    },

    /**
     * 取数据， key-value 形式
     *
     * @method load
     * @brief 取数据
     * @param {JSON} params
     * params 包含以下字段：
     *          key: {String} 存储的key<br/>
     *          domain: {String} 数据存储的域，传入bu名，防止各个bu间存了相同key的数据时错乱，不传则默认存在 common 区域<br/>
     *          isSecret: {bool} 可选，如果存的数据是加密存储的，需要传isSecret为true<br/>
     * @param callback: 取到value的回调  (value)=>{}
     * @example
     * ```
     * Storage.load({key:"abc", domain:"hotel"}, (value)=>{alert(value)});
     * ```
     */
    load(params, callback) {
        // storage.load({
        //     key: params.key,
        //     autoSync: true, // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
        //     syncInBackground: true, // syncInBackground(默认为true)意味着如果数据过期，在调用sync方法的同时先返回已经过期的数据。
        //     syncParams: {   // 你还可以给sync方法传递额外的参数
        //         extraFetchOptions: {
        //             // 各种参数
        //         },
        //         someFlag: true
        //     }
        // }).then(ret => {
        //     callback(ret);
        // }).catch(err => {
        //     //如果没有找到数据且没有sync方法，或者有其他异常，则在catch中返回
        //     console.warn(err.message);
        //     switch (err.name) {
        //     case 'NotFoundError':
        //         // TODO;
        //         break;
        //     case 'ExpiredError':
        //         // TODO
        //         break;
        //     }
        // })
        storage.load(params.key, callback)
    },

    /**
     * 删数据
     *
     * @method remove
     * @brief 删数据
     * @param {JSON} params
     *          params 包含以下字段：
     *          key: {String} 存储的key<br/>
     *          domain: {String} 数据存储的域，传入bu名，防止各个bu间存了相同key的数据时错乱，不传则默认存在 common 区域<br/>
     * @example
     * ```
     * Storage.remove({key:"abckey", domain:"hotel"});
     * ```
     */
    remove(params) {
        // storage.remove({key: params.key});
        storage.remove(params.key)
    },

    /**
     * 获取所有的KeyValues
     *
     * @method getAllKeyValues
     * @brief 取数据
     * @param {JSON} params
     * params 包含以下字段：
     *          domain: {String} 数据存储的域，传入bu名，防止各个bu间存了相同key的数据时错乱，不传则显示所有domain区域<br/>
     * @param callback: 取到value的回调  (value)=>{}
     * @example
     * ```
     * Storage.getAllKeyValues({domain:"hotel"}, (value)=>{alert(value)});
     * ```
     */
    getAllKeyValues(params, callback) {
        
    }
}