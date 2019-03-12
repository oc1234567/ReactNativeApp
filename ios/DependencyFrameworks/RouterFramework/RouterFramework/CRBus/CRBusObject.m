//
//  CRBusObject.m
//  RouterFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CRBusObject.h"
#import "CRBaseCommonDefine.h"

@interface CRBusObject()
{
    NSString *bizNamePrefix;
    NSString *urlHost;
}
@end

@implementation CRBusObject

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (id)initWithHost:(NSString *)host {
    if (self = [super init]) {
        urlHost = [host lowercaseString];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(appBootServiceFinished) name:kAppBootServiceFinished object:nil];
    }
    return self;
}

- (NSString *)businessNamePrefixAndURLHost
{
    return urlHost;
}

- (id)doDataJob:(NSString *)businessName params:(NSArray *)params {
    //TO BE OVERRIDE
    return NULL;
}

- (void)doAsyncDataJob:(NSString *)businessName params:(NSArray *)params resultBlock:(AsyncCallResult)result {
    
    //TO BE OVERRIDE
}

- (id)doURLJob:(NSURL *)url {
    //TO BE OVERRIDE
    return NULL;
}

- (void)doAsyncURLJob:(NSURL *)url resultBlock:(AsyncCallResult)result {
    //TO BE OVERRIDE
}

- (void)appBootServiceFinished{
    //TO BE OVERRIDE
}
@end
