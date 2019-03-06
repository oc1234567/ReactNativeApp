/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "ViewController.h"
//#import <React/RCTBundleURLProvider.h>
//#import <React/RCTRootView.h>
#import <testFramework/testFramework.h>
#import <FoundationFramework/FoundationFramework.h>
#import <UtilFramework/UtilFramework.h>
#import <LocationFramework/LocationFramework.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  SayHello *say = [[SayHello alloc] init];
  
  [say sayHello];
  
  SayHelloToFoundation * say_ = [[SayHelloToFoundation alloc] init];
 
  [say_ sayHello];
  
  NSArrayUtil *test = [[NSArrayUtil alloc] init];
  
  [test test];
  
  HelloLocation *location = [[HelloLocation alloc] init];
  
  [location testHello];
  
  
  
//  NSURL *jsCodeLocation;
//
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
//
//  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                                      moduleName:@"ReactNativeApp"
//                                               initialProperties:nil
//                                                   launchOptions:launchOptions];
//  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  ViewController *rootViewController = [ViewController new];
//  rootViewController.view = rootView;
  rootViewController.view.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
