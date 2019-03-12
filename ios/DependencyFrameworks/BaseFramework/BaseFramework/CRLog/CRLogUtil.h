//
//  CRLogUtil.h
//  FoundationFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import <Foundation/Foundation.h>

#ifdef DEBUG
#define FLog(format, ...) NSLog((@"%s@%d: " format), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__)
#else
#define FLog(format, ...)
#endif

#define TLog FLog

NS_ASSUME_NONNULL_BEGIN

@interface CRLogUtil : NSObject

@end

NS_ASSUME_NONNULL_END
