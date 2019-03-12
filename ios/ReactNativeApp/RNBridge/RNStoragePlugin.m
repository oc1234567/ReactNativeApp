//
//  RNStoragePlugin.m
//  ReactNativeApp
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "RNStoragePlugin.h"
#import <BaseFramework/BaseFramework.h>
#import <UtilFramework/NSString+CRExtensions.h>
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>

@implementation RNStoragePlugin

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback {
  if ([functionName isEqualToString:@"load"]) {
    NSString *key = parameters[@"key"];
    NSString *domain = parameters[@"domain"];
    BOOL isSecret = [parameters[@"isSecret"] boolValue];
    
    NSString *value = [[CRStorage sharedInstance] objectForKey:key inDomain:domain isSecret:isSecret];
    if (callback) {
      callback(@[RNResult(0, functionName, NULL), RCTNullIfNil(value)]);
    }
    
  }else if ([functionName isEqualToString:@"save"]) {
    NSString *key = parameters[@"key"];
    NSString *value = parameters[@"value"];
    NSString *domain = parameters[@"domain"];
    
    double expires = [RCTConvert double:parameters[@"expires"]];
    BOOL isSecret = [parameters[@"isSecret"] boolValue];
    
    [[CRStorage sharedInstance] setObject:value forKey:key inDomain:domain withExpires:expires isSecret:isSecret];
    
  }else if ([functionName isEqualToString:@"remove"]) {
    NSString *key = parameters[@"key"];
    NSString *domain = parameters[@"domain"];
    [[CRStorage sharedInstance] removeObjectForKey:key inDomain:domain];
    
  }else if ([functionName equalIgnoreCase:@"getAllKeyValues"]) {
    NSString *domain = parameters[@"domain"];
    NSDictionary *result;
    if (domain.length > 0) {
      NSMutableDictionary *tmpDict = [NSMutableDictionary dictionary];
      [tmpDict setValue:[[CRStorage sharedInstance] allKeyAndValuesInDomain:domain] forKey:domain];
      result = tmpDict;
    }else{
      result = [[CRStorage sharedInstance] allKeyAndValuesInAllDomain];
    }
    
    if (callback) {
      callback(@[RNResult(0, functionName, NULL), RCTNullIfNil(result)]);
    }
  }
  
}
@end
