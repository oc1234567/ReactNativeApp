//
//  RNPlugin.h
//  RNFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

#define RNResult(s, k, v) [RNPlugin RNResultWithStatusCode:(s) methodName:(k) errorDesc:(v)]

@interface RNPlugin : NSObject

//@property (nonatomic, weak) RCTBridge *bridge;

//@property (nonatomic, weak) UIViewController *viewController;
//
//@property (nonatomic, weak) UIView *crnView;

+ (void)callModule:(NSString *)moduleName
          function:(NSString *)functionName
        parameters:(NSDictionary *)parameters
            bridge:(RCTBridge *)bridge
          callback:(RCTResponseSenderBlock)callback;

- (void)callFunction:(NSString *)functionName
          parameters:(NSDictionary *)parameters
            callback:(RCTResponseSenderBlock)callback;

//- (void)clear;
//
+ (NSDictionary *)RNResultWithStatusCode:(int)statusCode
                              methodName:(NSString *)methodName
                               errorDesc:(NSString *)errorDesc;
//
//+ (UIViewController *)visibleViewController;

@end
