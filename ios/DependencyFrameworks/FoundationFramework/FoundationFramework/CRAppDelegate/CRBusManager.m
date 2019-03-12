//
//  CRBusManager.m
//  FoundationFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CRBusManager.h"

@implementation CRBusManager

+ (void)registerAllBus
{
    NSDictionary *busesMap = @{
                               @"CRMainBusObject":@"main",
                               };
    [busesMap enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
        CRBusObject *bus = [[NSClassFromString(key) alloc] initWithHost:(NSString *)obj];
        [CRBus register:bus];
    }];
    
}

@end
