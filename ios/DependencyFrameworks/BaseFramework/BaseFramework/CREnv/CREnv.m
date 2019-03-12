//
//  CREnv.m
//  BaseFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CREnv.h"
#import <objc/message.h>

#define kNetworkEnvTypeKey @"DebugEnv"

//网络类型定义
#define kEnvDescProduction @"prd"
#define kEnvDescFAT @"fat"
#define kEnvDescUAT @"uat"
#define kEnvDescBAOLEI @"battle"
#define kEnvDescUnknown @"Unknown-Env"

//包类型定义
#define kPackageTypeDescAutomation @"Automation"
#define kPackageTypeDescPro @"ProApp"
#define kPackageTypeDescYoung @"Young"

//缓存的env/pkgType
static eAppPackageType g_cachedAppPackageType = AppPackageType_Uknown;
static eNetworkEnvType g_cachedNetworkType = NetworkEnvType_Uknown;

//envType枚举转换成string
NSString *getNetworkEnvTypeStrFromEnum(eNetworkEnvType envType) {
    NSString *ret = nil;
    switch (envType) {
        case NetworkEnvType_PRO:
            ret = kEnvDescProduction;
            break;
        case NetworkEnvType_BAOLEI:
            ret = kEnvDescBAOLEI;
            break;
        case NetworkEnvType_UAT:
            ret = kEnvDescUAT;
            break;
        case NetworkEnvType_FAT:
            ret = kEnvDescFAT;
            break;
        default:
            ret = kEnvDescUnknown;
            break;
    }
    ret = ret.lowercaseString;
    return ret;
}

//envType 字符串转换成enum
eNetworkEnvType getNetworkEnvTypeFromStr(NSString *str) {
    eNetworkEnvType envType = NetworkEnvType_Uknown;
    str = str.lowercaseString;
    if ([str isEqualToString:kEnvDescProduction.lowercaseString]) {
        envType = NetworkEnvType_PRO;
    }
    else if ([str isEqualToString:kEnvDescUAT.lowercaseString]) {
        envType = NetworkEnvType_UAT;
    }
    else if ([str isEqualToString:kEnvDescFAT.lowercaseString]) {
        envType = NetworkEnvType_FAT;
    }
    else if ([str isEqualToString:kEnvDescBAOLEI.lowercaseString]) {
        envType = NetworkEnvType_BAOLEI;
    }
    
    return envType;
}

//获取当前网络环境枚举类型
eNetworkEnvType getNetworkEnvType() {
    if (g_cachedNetworkType == NetworkEnvType_Uknown) {
        Class packageManagerClass = NSClassFromString(@"PackageManager");
        NSString *envType = nil;
        if (packageManagerClass && [packageManagerClass respondsToSelector:NSSelectorFromString(@"getEnvType")]) {
            envType = ((NSString* (*) (id ,SEL))objc_msgSend)(packageManagerClass, NSSelectorFromString(@"getEnvType"));
        }
        envType = envType.lowercaseString;
        g_cachedNetworkType = getNetworkEnvTypeFromStr(envType);
        
        //FAT-UAT需要从NSUserDefault读取修改的网络类型
        if (g_cachedNetworkType == NetworkEnvType_FAT ||
            g_cachedNetworkType == NetworkEnvType_UAT) {
            NSString *envStr = [[NSUserDefaults standardUserDefaults] stringForKey:kNetworkEnvTypeKey];
            if (envStr.length > 0) {
                g_cachedNetworkType = getNetworkEnvTypeFromStr(envStr);
            }
        }
    }
    
    return g_cachedNetworkType;
}

//设置当前网络环境
BOOL setNetworkEnvType(eNetworkEnvType envType) {
    if (![NSThread currentThread].isMainThread || envType == NetworkEnvType_Uknown) {
        return NO;
    }
    
    BOOL ret = YES;
    if (g_cachedNetworkType != envType) {
        g_cachedNetworkType = envType;
        NSString *typeStr = getNetworkEnvTypeStrFromEnum(envType);
        [[NSUserDefaults standardUserDefaults] setObject:typeStr forKey:kNetworkEnvTypeKey];
    }
    return ret;
}

//获取当前打包类型
eAppPackageType getAppPackageType() {
    if (g_cachedAppPackageType == AppPackageType_Uknown) {
        Class packageManagerClass = NSClassFromString(@"PackageManager");
        NSString *pkgType = nil;
        if (packageManagerClass && [packageManagerClass respondsToSelector:NSSelectorFromString(@"getPackageType")]) {
            pkgType = ((NSString* (*) (id ,SEL))objc_msgSend)(packageManagerClass, NSSelectorFromString(@"getPackageType"));
        }
        pkgType = pkgType.lowercaseString;
        if ([pkgType isEqualToString:kPackageTypeDescPro.lowercaseString]) {
            g_cachedAppPackageType = AppPackageType_PRO;
        }
        else if ([pkgType isEqualToString:kPackageTypeDescAutomation.lowercaseString]) {
            g_cachedAppPackageType = AppPackageType_Automation;
        }
        else if ([pkgType isEqualToString:kPackageTypeDescYoung.lowercaseString]) {
            g_cachedAppPackageType = AppPackageType_Young;
        }
        else {
            g_cachedAppPackageType = AppPackageType_Default;
        }
    }
    return g_cachedAppPackageType;
}

//获取当前网络环境字符串类型
NSString *getNetworkEnvStr() {
    eNetworkEnvType envType = getNetworkEnvType();
    return getNetworkEnvTypeStrFromEnum(envType);
}

BOOL isProductionEnv() {
    return getNetworkEnvType() == NetworkEnvType_PRO;
}

BOOL isBaoleiEnv() {
    return getNetworkEnvType() == NetworkEnvType_BAOLEI;
}

BOOL isFATEnv() {
    return getNetworkEnvType() == NetworkEnvType_FAT;
}

BOOL isUATEnv() {
    return getNetworkEnvType() == NetworkEnvType_UAT;
}

BOOL isDevEnv() {
    return isFATEnv() || isUATEnv();
}

//是否是测试包
BOOL isDevPackage() {
    Class packageManagerClass = NSClassFromString(@"PackageManager");
    NSString *envTypeStr = nil;
    if (packageManagerClass && [packageManagerClass respondsToSelector:NSSelectorFromString(@"getEnvType")]) {
        envTypeStr = ((NSString* (*) (id ,SEL))objc_msgSend)(packageManagerClass, NSSelectorFromString(@"getEnvType"));
    }
    envTypeStr = envTypeStr.lowercaseString;
    eNetworkEnvType envType = getNetworkEnvTypeFromStr(envTypeStr);
    return envType == NetworkEnvType_UAT || envType == NetworkEnvType_FAT;
}

