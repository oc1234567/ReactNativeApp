//
//  RNModule.m
//  RNFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "RNModule.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation RNModule

- (RCTRootView *)test {
    NSURL *jsCodeLocation;
    
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"ReactNativeApp"
                                                 initialProperties:nil
                                                     launchOptions:nil];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    
    return rootView;
}
@end
