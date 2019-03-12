//
//  NSString+CRExtensions.m
//  UtilFramework
//
//  Created by zhangyajun on 2019/3/12.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "NSString+CRExtensions.h"

@implementation NSString (Utils)

- (BOOL)equalIgnoreCase:(NSString *)cmpString {
    return [[self lowercaseString] isEqualToString:[cmpString lowercaseString]];
}

@end
