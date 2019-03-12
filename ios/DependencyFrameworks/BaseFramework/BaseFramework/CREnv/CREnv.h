//
//  CREnv.h
//  BaseFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#ifndef CTRIP_WIRELESS_CONFIG_H
#define CTRIP_WIRELESS_CONFIG_H
#import <Foundation/Foundation.h>

#pragma mark -------------------------不同安装包配置总开关--------------
typedef enum eNetworkEnvType {
    NetworkEnvType_Uknown = 0,
    NetworkEnvType_FAT = 1,
    NetworkEnvType_UAT = 2,
    NetworkEnvType_BAOLEI = 3,
    NetworkEnvType_PRO = 4,
} eNetworkEnvType;

typedef enum eAppPackageType {
    AppPackageType_Uknown = 0,
    AppPackageType_Default = 1,
    AppPackageType_PRO = 2,
    AppPackageType_Automation = 3,
    AppPackageType_Young = 4,
} eAppPackageType;

//获取当前网络环境枚举类型
eNetworkEnvType getNetworkEnvType();

//获取当前打包类型
eAppPackageType getAppPackageType();

//设置当前网络环境
BOOL setNetworkEnvType(eNetworkEnvType envType);

//获取当前网络环境字符串类型
NSString *getNetworkEnvStr();

eNetworkEnvType getNetworkEnvTypeFromStr(NSString *str);

//几个环境判断
BOOL isProductionEnv();//生产环境
BOOL isBaoleiEnv();//堡垒
BOOL isFATEnv();//FAT
BOOL isUATEnv();//UAT

BOOL isDevEnv();

BOOL isDevPackage(); //是否是测试包

#endif
