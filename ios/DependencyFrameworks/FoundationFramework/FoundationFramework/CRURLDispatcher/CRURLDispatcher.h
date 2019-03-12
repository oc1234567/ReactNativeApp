//
//  CRURLDispatcher.h
//  FoundationFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
NS_ASSUME_NONNULL_BEGIN

@interface CRURLDispatcher : NSObject

/**
 *   URL跳转API，支持ctrip://, http(s)://, /(本地相对路径,必须以/开始, 为相对webapp的路径)
 *
 *  @param viewController 当前ViewController
 *  @param path        url路径
 *  @param title          打开页面的title，http(s), / 支持，ctrip:// schema不支持
 *
 *  @return 跳转成功之后返回true，否则返回false
 */
BOOL openURL(UIViewController *viewController, NSString *path, NSString *title);

+ (void)dispatchURL:(NSURL *)url withParentViewController:(UIViewController *)parentViewController;

+ (void)dispatchURL:(NSURL *)url fromApplication:(NSString *)sourceApplication withParentViewController:(UIViewController *)parentViewController;

@end

NS_ASSUME_NONNULL_END
