//
//  RNPlugin.m
//  RNFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "RNPlugin.h"
//#import <React/RCTUtils.h>
//#import <objc/message.h>
//#import <React/RCTBridge.h>

@implementation RNPlugin

//+ (void)callModule:(NSString *)moduleName
//          function:(NSString *)functionName
//        parameters:(NSDictionary *)parameters
//            bridge:(RCTBridge *)bridge
//          callback:(RCTResponseSenderBlock)callback
//{
////    RCTAssert(moduleName, @"module name should not be null.");
////    RCTAssert(functionName, @"function name should not be null.");
//    NSString *moduleClassName = [[@"RN" stringByAppendingString:moduleName] stringByAppendingString:@"Plugin"];
//
//    RNPlugin *object = [RNPlugin pluginObjectForBridge:bridge moduleClass:moduleClassName];
//    [object callFunction:functionName parameters:parameters callback:callback];
//}
//
//+ (RNPlugin *)pluginObjectForBridge:(RCTBridge *)bridge moduleClass:(NSString *)moduleClassName{
//    if (bridge == NULL || ![moduleClassName isKindOfClass:[NSString class]]) {
//        return NULL;
//    }
//
//    Class cxxBridgeClass = objc_lookUpClass("RCTCxxBridge");
//    if ([bridge isKindOfClass:cxxBridgeClass]) {
//        bridge = [bridge valueForKey:@"parentBridge"];
//    }
//
//    RNPlugin *object = nil;
////    if (bridge && [bridge isKindOfClass:[RCTBridge class]]) {
////        @synchronized(bridge.pluginObjectsDict){
////            object = [bridge.pluginObjectsDict valueForKey:moduleClassName];
////        }
////    }
//    if (object) {
//        return object;
//    }
//
//    Class cls = NSClassFromString(moduleClassName);
//    object = [[cls alloc] init];
//    object.bridge = bridge;
//
////    @synchronized(bridge.pluginObjectsDict){
////        [bridge.pluginObjectsDict setValue:object forKey:moduleClassName];
////    }
//
////    RCTAssert([cls isSubclassOfClass:self], @"can not find the class, module name may be incorrect.");
//    return object;
//}
//
//- (void)callFunction:(NSString *)functionName
//          parameters:(NSDictionary *)parameters
//            callback:(RCTResponseSenderBlock)callback {
//    //subclass override.
//}
@end
