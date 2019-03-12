//
//  NSString+CRURL.m
//  UtilFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "NSString+CRURL.h"
#import "NSMutableDictionary+CRExtensions.h"
#import "NSArray+CRExtensions.h"

@interface NSString (CRURLPrivate)

@property (readonly, strong) NSArray *queryArray;//为了保证 query item 的顺序，所以用 array。

@end

@implementation NSString (CRURL)

- (NSDictionary *)query
{
    NSMutableDictionary *query = nil;
    NSArray *array = self.queryArray;
    for (NSDictionary *item in array) {
        if (!query) {
            query = [NSMutableDictionary dictionary];
        }
        [query setSafeObject:[item.allValues objectAtIndexForCtrip:0] forKey:[item.allKeys objectAtIndexForCtrip:0]];
    }
    
    return query;
}

- (NSString *)queryString
{
    return @"";
}

#pragma mark - ---- 进入H5指定页面使用

#define kHostNameKey @"kHostNameKey"

- (NSDictionary *)getDictFromURLString
{
    if (self.length == 0) {
        return nil;
    }
    NSString *urlString = [self copy];
    NSMutableDictionary *resultDictionary = [NSMutableDictionary dictionary];
    
    NSRange range = [urlString rangeOfString:@"?"];
    if (range.length > 0) {
        NSString *hostString = [urlString substringToIndex:range.location];
        [resultDictionary setValue:hostString forKey:kHostNameKey];
        
        NSString *firstLevelInfo = [urlString substringFromIndex:range.location+1];
        if (firstLevelInfo.length > 0) {
            NSArray *secondLevelArray = [firstLevelInfo componentsSeparatedByString:@"&"];
            for (int j = 0; j < secondLevelArray.count; j++) {
                NSString *secondLevelInfo = [secondLevelArray objectAtIndexForCtrip:j];
                NSRange secondRange = [secondLevelInfo rangeOfString:@"="];
                if (secondRange.location != NSNotFound) {
                    NSString *key = [secondLevelInfo substringToIndex:secondRange.location];
                    key = [key stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                    key = [key stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
                    NSString *value = [secondLevelInfo substringFromIndex:secondRange.location + 1];
                    value = [value stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                    [resultDictionary setValue:value forKey:key];
                }
            }
        }
    }
    else {
        [resultDictionary setValue:urlString forKey:kHostNameKey];
    }
    
    return resultDictionary;
}
@end
