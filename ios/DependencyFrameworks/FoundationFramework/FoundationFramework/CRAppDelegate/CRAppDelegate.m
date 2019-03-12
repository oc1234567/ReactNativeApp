//
//  CRAppDelegate.m
//  FoundationFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CRAppDelegate.h"

@implementation CRAppDelegate

- (BOOL)application:(UIApplication *)application willFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    return [self handleApplication:application willFinishLaunchingWithOptions:launchOptions];
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    [self handleApplicationWillEnterForeground:application];
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    [self handleApplicationDidBecomeActive:application];
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    [self handlApplicationDidEnterBackground:application];
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    [self handleApplicationWillTerminate:application];
}

#pragma mark - URL跳转
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
    return YES;
}

#pragma mark - ----------------------App横竖屏设置--------------------
- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
    /** 自动旋转 */
//    if (self.allowRotation) {
//        return UIInterfaceOrientationMaskAll;
//    }
    /** 默认不旋转 */
    return UIInterfaceOrientationMaskPortrait;
}

#pragma mark - 程序主入口
- (BOOL)handleApplication:(UIApplication *)application willFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [self handleApplicationDidFinishLaunchingWithOptions:launchOptions];
    return YES;
}

-(BOOL)handleApplicationDidFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    return YES;
}

#pragma mark - 进入前台
- (void)handleApplicationWillEnterForeground:(UIApplication *)application
{
    
}
- (void)handleApplicationDidBecomeActive:(UIApplication *)application
{
    
}
#pragma mark - 进入后台
- (void)handlApplicationDidEnterBackground:(UIApplication *)application;
{
    
}
#pragma mark - App结束
- (void)handleApplicationWillTerminate:(UIApplication *)application
{
    NSString *path = [NSTemporaryDirectory() stringByAppendingPathComponent:@"CTPickedImages"];
    [[NSFileManager defaultManager] removeItemAtPath:path error:nil];
    
}
@end
