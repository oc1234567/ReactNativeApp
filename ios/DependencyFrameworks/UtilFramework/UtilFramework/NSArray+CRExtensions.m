//
//  NSArray+CRExtensions.m
//  UtilFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "NSArray+CRExtensions.h"
#import <BaseFramework/CRLogUtil.h>

@implementation NSArray (CRExtensions)

- (id)objectAtIndexForCtrip:(NSUInteger)index
{
    if (index < self.count)
    {
        return [self objectAtIndex:index];
    }
    else
    {
        FLog(@"count:%lu index:%lu", (unsigned long)self.count, (unsigned long)index);
        return nil;
    }
}


@end
