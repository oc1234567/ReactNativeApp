//
//  PackageManager.h
//  ReactNativeApp
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface PackageManager : NSObject

/*
 *  获取当前包使用的环境类型
 *
 *  @return 返回值定义如下-->生产：PRO，测试：TEST，堡垒: BAOLEI
 */
+ (NSString *)getEnvType;

/*
 *  获取包类型
 *
 *  @return 返回值定义如下-->默认包：Default，PRO包：ProApp，自动化测试包: Automation
 */
+ (NSString *)getPackageType;

+ (NSString *)ApplicationVersion;
@end

NS_ASSUME_NONNULL_END
