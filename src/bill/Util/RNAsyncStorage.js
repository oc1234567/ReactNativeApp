import {AsyncStorage} from 'react-native'

export const RNAsyncStorage = {

    // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
    // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
    save(key, obj) {
        AsyncStorage.setItem(key, obj);
    },
    // 取数据
    load(key, callBack) {
        AsyncStorage.getItem(key, callBack);
    },
    // 删除数据
    remove(key) {
        AsyncStorage.removeItem(key);
    }

}
// export {_storage as RNAsyncStorage}