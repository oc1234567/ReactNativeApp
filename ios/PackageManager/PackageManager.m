//
//  PackageManager.m
//  ReactNativeApp
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "PackageManager.h"

//自动化测试
//#define AUTOMATIC_TEST_ENV
//PRO版
//#define IS_PRO_PACKAGE

//市场独立版本
//#define IS_MARKET_PACKAGE

#ifndef IN_PRODUCT_ENV
#define InDev               //测试环境宏
#endif

//环境类型定义
#define kEnvDescProduction @"prd"
#define kEnvDescFAT @"fat"
#define kEnvDescUAT @"uat"
#define kEnvDescBAOLEI @"battle"
#define kEnvDescUnknown @"Unknown-Env"

//包类型定义
#define kPackageTypeDescAutomation @"Automation"
#define kPackageTypeDescPro @"ProApp"
#define kPackageTypeDescDefault @"Default"
#define kPackageTypeDescYoung @"Young"

@interface PackageManager  ()
@property(nonatomic, copy) NSString* packageType;
@property(nonatomic, copy) NSString* envType;
@end

//每个版本需要手动配置：
static const NSString *__ApplicationVersion = @"802.000";  //打包脚本会读取这个值，不要随意移动代码
static const NSString *__VersionCode = @"1179";

@implementation PackageManager

//envType定义如下：生产："prd"，测试："uat"/"fat"，堡垒: "battle"
//packageType定义如下：默认包：Default，PRO包：ProApp，自动化测试包: Automation
-(instancetype)init {
  self = [super init];
  if (self) {
    self.envType = @"uat";   //打包脚本会修改这个值，勿修改提交
    self.packageType = kPackageTypeDescDefault;
    
#ifdef AUTOMATIC_TEST_ENV
    self.packageType = kPackageTypeDescAutomation;
#endif
    
#ifdef IS_PRO_PACKAGE
    self.packageType = kPackageTypeDescPro;
#endif
    
  }
  return self;
}

+(PackageManager*)share {
  static PackageManager* _manager = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _manager = [[PackageManager alloc] init];
  });
  return _manager;
}

//请勿修改API名，内部会反射调用
+(NSString *)getPackageType {
  return [PackageManager share].packageType;
}

//请勿修改API名，内部会反射调用
+(NSString *)getEnvType {
  return [PackageManager share].envType;
}

+(const NSString*)ApplicationVersion {
  return __ApplicationVersion;
}

+(const NSString*)ApplicationVersionCode {
  return __VersionCode;
}

@end
