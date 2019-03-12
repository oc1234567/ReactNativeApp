//
//  RNNativeCall.m
//  RNFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "RNNativeCall.h"
#import "RNPlugin.h"
//#import <BaseFramework/CRLogUtil.h>
//#import <BaseFramework/CRLogManager.h>

@implementation RNNativeCall

//RCT_EXPORT_MODULE();

//RCT_EXPORT_METHOD(errorHandler:(NSDictionary *)error){
//
////    if([CRLogManager crnLogEnable ])
////        TLog(@"DoNothing for ErrorHandler: %@", error);
//}

//RCT_REMAP_METHOD(callNative,
//                 callModule:(NSString *)moduleName
//                 function:(NSString *)functionName
//                 parameters:(NSDictionary *)parameters)
//{
////    if([CRLogManager crnLogEnable ]){
////        TLog(@"CRN->[%@]->[%@]", moduleName, functionName);
////    }
//
//    [RNPlugin callModule:moduleName
//                 function:functionName
//               parameters:parameters
//                   bridge:self.bridge
//                 callback:nil];
//}
//
//RCT_REMAP_METHOD(callNativeWithCallback,
//                 callModule:(NSString *)moduleName
//                 function:(NSString *)functionName
//                 parameters:(NSDictionary *)parameters
//                 callback:(RCTResponseSenderBlock)callback)
//{
////    if([CRLogManager crnLogEnable ]){
////        TLog(@"CRN<callback>->[%@]->[%@]", moduleName, functionName);
////    }
//    [RNPlugin  callModule:moduleName
//                  function:functionName
//                parameters:parameters
//                    bridge:self.bridge
//                  callback:callback];
//}

@end
