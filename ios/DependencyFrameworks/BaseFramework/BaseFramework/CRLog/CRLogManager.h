//
//  CRLogManager.h
//  BaseFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CRLogManager : NSObject

+ (void)setH5PackDownloadLogEnable:(BOOL)enable;
+ (BOOL)h5PackLoadloadLogEnable;

+ (void)setH5HybridLogEnable:(BOOL)enable;
+ (BOOL)h5HybridLogEnable;

+ (void)setCRNLogEnable:(BOOL)enable;
+ (BOOL)crnLogEnable;

+ (void)setSenderTaskLogEnable:(BOOL)enable;
+ (BOOL)senderTaskLogEnable;

@end

NS_ASSUME_NONNULL_END
