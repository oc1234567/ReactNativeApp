//
//  CRBus.m
//  RouterFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CRBus.h"
#import <libkern/OSAtomic.h>

@interface CRBus()

@property (nonatomic, strong) NSMutableDictionary *dataBusObjectMap;

@end

static CRBus *g_bus;

@implementation CRBus

static OSSpinLock busSpinLock = OS_SPINLOCK_INIT;

+ (void)initializeBusIfNeed {
    if (g_bus == NULL) {
        static dispatch_once_t onceToken;
        dispatch_once(onceToken, ^{
            g_bus = [[CRBus alloc] init];
        });
    }
}

- (id)init {
    if (self = [super init]) {
        self.dataBusObjectMap = [NSMutableDictionary dictionary];
    }
    return self;
}

+ (CRBus *)sharedInstance {
    [CRBus initializeBusIfNeed];
    return g_bus;
}

+ (CRBusObject *)busObjectForName:(NSString *)bizname {
    OSSpinLockLock(&busSpinLock);
    
    NSDictionary *busObjectMap = [CRBus sharedInstance].dataBusObjectMap;
    NSArray *hosts = [busObjectMap allKeys];
    NSString *findKey = nil;
    for (NSString *key in hosts) {
        if ([[bizname lowercaseString] hasPrefix:[key lowercaseString]]) {
            findKey = key;
            break;
        }
    }
    CRBusObject *bus = [busObjectMap valueForKey:findKey];
    OSSpinLockUnlock(&busSpinLock);
    return bus;
}

+ (void)register:(CRBusObject *)busObj
{
    if (busObj == NULL) {
        return;
    }
    
    OSSpinLockLock(&busSpinLock);
    if ([[CRBus sharedInstance].dataBusObjectMap valueForKey:busObj.businessNamePrefixAndURLHost]) {
        NSAssert(false, @"host名=[%@]已注册，不可重复注册", busObj.businessNamePrefixAndURLHost);
    }
    [[CRBus sharedInstance].dataBusObjectMap setValue:busObj forKey:busObj.businessNamePrefixAndURLHost];
    OSSpinLockUnlock(&busSpinLock);
}

+ (id)callData:(NSString *)bizName param:(NSObject *)param, ...
{
    CRBusObject *bus = [CRBus busObjectForName:bizName];
    
    NSMutableArray *paramsArray = nil;
    id eachItem;
    va_list argumentList;
    if (param != nil) {
        paramsArray = [NSMutableArray array];
        [paramsArray addObject:param];
        va_start(argumentList, param);
        while ((eachItem = va_arg(argumentList, id))) {
            [paramsArray addObject:eachItem];
        }
        va_end(argumentList);
    }
    id ret = [bus doDataJob:bizName params:paramsArray];
    return ret;
}

+ (void)asyncCallData:(NSString *)bizName result:(id)result param:(NSObject *)param, ...
{
    CRBusObject *bus = [CRBus busObjectForName:bizName];
    
    NSMutableArray *paramsArray = nil;
    id eachItem;
    va_list argumentList;
    if (param != nil) {
        paramsArray = [NSMutableArray array];
        [paramsArray addObject:param];
        va_start(argumentList, param);
        while ((eachItem = va_arg(argumentList, id))) {
            [paramsArray addObject:eachItem];
        }
        va_end(argumentList);
    }
    
    [bus doAsyncDataJob:bizName params:paramsArray resultBlock:result
     ];
}

+ (id)callURL:(NSURL *)url
{
    NSString *host = [url host];
    CRBusObject *bus = [CRBus busObjectForName:host];
    return [bus doURLJob:url];
}

+ (void)asyncCallURL:(NSURL *)url result:(id)result
{
    NSString *host = [url host];
    CRBusObject *bus = [CRBus busObjectForName:host];
    [bus doAsyncURLJob:url resultBlock:result];
}
@end
