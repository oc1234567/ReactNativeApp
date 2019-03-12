//
//  NSMutableDictionary+CRExtensions.m
//  UtilFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "NSMutableDictionary+CRExtensions.h"

@implementation NSMutableDictionary (Safe)

- (void)setSafeObject:(id)anObject forKey:(id)aKey {
    if (aKey == nil) {
        NSAssert(false, @"aKey is NULL, crashed");
    }
    else if ([aKey isKindOfClass:[NSString class]]) {
        [self setValue:anObject forKey:aKey];
    }
    else if ([aKey conformsToProtocol:@protocol(NSCopying)]) {
        if (anObject == NULL) {
            [self removeSafeObjectForKey:aKey];
        }
        else {
            [self setObject:anObject forKey:aKey];
        }
    }
}

- (void)removeSafeObjectForKey:(id)aKey
{
    if (!aKey) {
        NSAssert(false, @"aKey is NULL, crashed");
    } else if ([aKey conformsToProtocol:@protocol(NSCopying)]) {
        [self removeObjectForKey:aKey];
    }
}

@end
