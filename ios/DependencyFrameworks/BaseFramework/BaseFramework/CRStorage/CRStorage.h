//
//  CRStorage.h
//  BaseFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import <Foundation/Foundation.h>

//NS_ASSUME_NONNULL_BEGIN

@interface CRStorage : NSObject

+ (instancetype)sharedInstance;

- (BOOL)containsObjectForKey:(NSString *)key inDomain:(NSString *)domain;

- (NSString *)objectForKey:(NSString *)key inDomain:(NSString *)domain;

- (NSString *)objectForKey:(NSString *)key inDomain:(NSString *)domain isSecret:(BOOL)isSecret;
/*
 @param object: value值
 @param key: key
 @param domain: 数据存储的域，传入bu名，防止各个bu间存了相同key的数据时错乱，传空则默认存在 common 区域
 */
- (void)setObject:(NSString *)object forKey:(NSString *)key inDomain:(NSString *)domain;

/*
 @param object: value值
 @param key: key
 @param domain: 数据存储的域，传入bu名，防止各个bu间存了相同key的数据时错乱，传空则默认存在 common 区域
 @param timeInterval: 过期时间，单位为秒
 */
- (void)setObject:(NSString *)object forKey:(NSString *)key inDomain:(NSString *)domain withExpires:(double)timeInterval;

/*
 @param object: value值
 @param key: key
 @param domain: 数据存储的域，传入bu名，防止各个bu间存了相同key的数据时错乱，传空则默认存在 common 区域
 @param isSecret: 是否加密储存，默认NO，若为YES则取数据时也需要传isSecret
 */
- (void)setObject:(NSString *)object forKey:(NSString *)key inDomain:(NSString *)domain withExpires:(double)timeInterval isSecret:(BOOL)isSecret;

- (void)removeObjectForKey:(NSString *)key inDomain:(NSString *)domain;

//{"key1":"value1","key2":""value2"}
- (NSDictionary *)allKeyAndValuesInDomain:(NSString *)domain;

//{"domain1":{"key1":"value1","key2":""value2"},"domain2":{"key1":"value1","key2":""value2"}}
- (NSDictionary *)allKeyAndValuesInAllDomain;

@end

//NS_ASSUME_NONNULL_END
