//
//  CRFoundationCommonUtil.m
//  FoundationFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CRFoundationCommonUtil.h"

@implementation CRFoundationCommonUtil

NSString *getAppVersion() {
    static NSString *currentVersion = nil;
    
    if (currentVersion == nil) {
        currentVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
        if (currentVersion.length == 0) {
            currentVersion = @"";
        }
    }
    
    return currentVersion;
}


@end
