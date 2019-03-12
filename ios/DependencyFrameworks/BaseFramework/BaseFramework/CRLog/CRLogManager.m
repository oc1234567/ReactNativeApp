//
//  CRLogManager.m
//  BaseFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CRLogManager.h"

@implementation CRLogManager
static BOOL _H5HybridLogEnable = NO;
static BOOL _H5PackDownLoadLogEnable = NO;
static BOOL _CRNLogEnable = NO;
static BOOL _CTSenderTaskLogEnable = NO;

+ (void)load {
    
#ifdef DEBUG
    _H5HybridLogEnable = YES;
    _H5PackDownLoadLogEnable = YES;
    _CRNLogEnable = YES;
    _CTSenderTaskLogEnable = YES;
#endif
    
}

+ (void)setH5PackDownloadLogEnable:(BOOL)enable {
    _H5PackDownLoadLogEnable = enable;
}
+ (BOOL)h5PackLoadloadLogEnable {
    return _H5PackDownLoadLogEnable;
}

+ (void)setH5HybridLogEnable:(BOOL)enable {
    _H5HybridLogEnable = enable;
}
+ (BOOL)h5HybridLogEnable {
    return _H5HybridLogEnable;
}

+ (void)setCRNLogEnable:(BOOL)enable {
    _CRNLogEnable = enable;
}
+ (BOOL)crnLogEnable {
    return _CRNLogEnable;
}

+ (void)setSenderTaskLogEnable:(BOOL)enable {
    _CTSenderTaskLogEnable = enable;
}
+ (BOOL)senderTaskLogEnable {
    return _CTSenderTaskLogEnable;
}

@end
