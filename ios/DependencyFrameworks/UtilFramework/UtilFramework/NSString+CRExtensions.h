//
//  NSString+CRExtensions.h
//  UtilFramework
//
//  Created by zhangyajun on 2019/3/12.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (Utils)

/**
 *  判断字符串是否相等，不区分大小写
 *
 *  @param cmpString 需要比较的字符串
 *
 *  @return 相等返回true，否则返回false
 */
- (BOOL)equalIgnoreCase:(NSString *)cmpString;


@end

