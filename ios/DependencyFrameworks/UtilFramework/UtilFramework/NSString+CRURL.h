//
//  NSString+CRURL.h
//  UtilFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface NSString (CRURL)

@property (readonly, strong) NSDictionary *query;
@property (readonly, copy) NSString *queryString;

/*
 ** 历史遗留
 */
- (NSDictionary *)getDictFromURLString;

@end

NS_ASSUME_NONNULL_END
