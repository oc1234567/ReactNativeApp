
//
//  CRURLDispatcher.m
//  FoundationFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CRURLDispatcher.h"
#import "CRNURL/CRNURL.h"
#import <UtilFramework/NSString+CRURL.h>

@implementation CRURLDispatcher

BOOL openURL(UIViewController *viewController, NSString *path, NSString *title)
{
    if (path.length == 0) {
        return NO;
    }
//    path = [CRURLDispatcher ]
    
    return YES;
}

+ (void)dispatchURL:(NSURL *)url withParentViewController:(UIViewController *)parentViewController
{
    
}

+ (void)dispatchURL:(NSURL *)url fromApplication:(NSString *)sourceApplication withParentViewController:(UIViewController *)parentViewController
{
    
}

#pragma mark - Tool
+ (NSString *)refactorUrlIfNeed:(NSString *)urlPath{
    //url拦截
    NSString* toCRNUrl = [CRURLDispatcher getH2CByBase64Url:urlPath];
    if ([toCRNUrl length] > 0){
        urlPath = toCRNUrl;
    }
    
    return urlPath;
}

+ (NSString*)getH2CByBase64Url:(NSString*)url{
    BOOL isRNURL = [CRNURL isCRNURL:url];
    
    if (isRNURL){
        //rn不做拦截
        return nil;
    }
    
    if (url.length == 0||[url hasPrefix:@"http"]) {
        //直连不做拦截
        return nil;
    }
    
    if ([CRURLDispatcher isOldSytleScheme:url]){
        url = [CRURLDispatcher transOldSytleSchemeToRelateNativeUrl:url];
    }
    
    BOOL needBase64 = NO;
    
    NSDictionary *urlDict = [url query];
//    NSString *encodedUrlStr = [urlDict objectForKey:@"url"];
//
//    if([encodedUrlStr length] != 0){
//        needBase64 = YES;
//    }
//
//    if (needBase64){
//        url = [encodedUrlStr Base64DecodeToString];
//        if (url.length == 0) {
//            return nil;
//        }
//    }
//
//    NSArray<CTURLH2CModel*>* urlList = [CTURLDispatcher mappingUrlList];
//    if (!urlList){
//        //加载本地url拦截列表
//        NSData* data = [NSData dataWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"h5toCrnUrlMapping.json" ofType:nil]];
//        NSString* urlListStr  = [data UTF8String];
//        id ret = [urlListStr objectFromJSONStringForCtrip];
//        if ([ret isKindOfClass:[NSArray class]]){
//
//            NSMutableArray<CTURLH2CModel*>* newUrlList = [[NSMutableArray alloc]init];
//            for (NSInteger i = 0; i < ((NSArray*)ret).count; i++){
//                CTURLH2CModel* h2cModel = [[CTURLH2CModel alloc] init];
//                NSDictionary* dic = (NSDictionary*)((NSArray*)ret)[i];
//                [dic enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
//                    if ([(NSString*)key isEqualToString:@"isNewRule"]){
//                        h2cModel.isNewRule = [obj boolValue];
//                    }else{
//                        h2cModel.pattern = (NSString*)key;
//                        h2cModel.template = (NSString*)obj;
//                    }
//                }];
//
//                [newUrlList addObject:h2cModel];
//            }
//
//
//            urlList = newUrlList;
//            [CTURLDispatcher setMappingUrlList:newUrlList];
//        }
//    }
//
//
//    NSArray<CTURLH2CModel*>* serverUrlList = [CTURLDispatcher mappingUrlListFromServer];
//    if (serverUrlList){
//        if (!urlList){
//            urlList = serverUrlList;
//        }else{
//            NSMutableArray<CTURLH2CModel*>* newUrlList = [NSMutableArray arrayWithArray:urlList];
//            urlList = [newUrlList arrayByAddingObjectsFromArray:serverUrlList];
//        }
//        //服务端url列表合并到本地url列表之后，为了下次不再走进这个逻辑，设置服务端列表为nil，
//        [CTURLDispatcher setMappingUrlList:urlList];
//        [CTURLDispatcher setMappingUrlListFromServer:nil];
//    }
//
//    for (CTURLH2CModel* h2cModel in urlList){
//
//        NSString* pattern = h2cModel.pattern;
//        NSString* template = h2cModel.template;
//        BOOL isNewRule = h2cModel.isNewRule;
//
//        if (isNewRule){
//            NSError * error;
//            NSRegularExpression* regExpression = [[NSRegularExpression alloc] initWithPattern:pattern options:NSRegularExpressionCaseInsensitive error:&error];
//            if (!error){
//                NSString* regExpResult = [regExpression stringByReplacingMatchesInString:url options:NSMatchingReportCompletion range:NSMakeRange(0, url.length) withTemplate:template];
//                if (![url isEqualToString:regExpResult]){
//                    NSString* urlC = [NSString stringWithFormat:@"ctrip://wireless/h5?url=%@&type=5",[regExpResult Base64EncodeToString]];
//                    return urlC;
//                }
//
//            }
//        }else{
//            if ([url rangeOfString:pattern options:NSRegularExpressionSearch].location != NSNotFound){
//                NSString* urlC = [NSString stringWithFormat:@"%@&cmapping_origin_url=%@",template,[url Base64EncodeToString]];
//                NSMutableDictionary* info = [[NSMutableDictionary alloc] init];
//                [info setValue:url forKey:@"h5Url"];
//                [info setValue:urlC forKey:@"toCRNUrl"];
//                [CTLogUtil logTrace:@"o_h5_to_crn_mapping" userInfo:info];
//                return urlC;
//            }
//        }
//
//    }
//
    
    return nil;
}

#pragma mark - Tool
+ (BOOL)isOldSytleScheme:(NSString*)url{
    if ([url hasPrefix:@"ctrip://wireless/h5?"] && [url rangeOfString:@"page="].location != NSNotFound && [url rangeOfString:@"path="].location != NSNotFound){
        return YES;
    }
    return NO;
}

+ (NSString*)transOldSytleSchemeToRelateNativeUrl:(NSString*)url{
    
    NSDictionary* paramDict = [url getDictFromURLString];
    
    NSString *pageFlag = @"page";
    NSString *pathFlag = @"path";
    
    NSString *pageName = paramDict[pageFlag];
    NSString *path = paramDict[pathFlag];
    
    if (pageName.length > 0 && path.length > 0) {
        NSString* urlStr = [NSString stringWithFormat:@"/%@/%@",path,pageName];
        NSMutableString *paramStr = [NSMutableString string];
        for (NSString *key in paramDict.allKeys) {
            if ([key isEqualToString:@"kHostNameKey"]){
                continue;
            }
            if (![key isEqualToString:pageFlag] && ![key isEqualToString:pathFlag]) {
                [paramStr appendFormat:@"%@=%@&", key, [[paramDict valueForKey:key] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
            }
        }
        
        if ([paramStr hasSuffix:@"&"]) {
            [paramStr deleteCharactersInRange:NSMakeRange(paramStr.length - 1, 1)];
        }
        
        if (paramStr.length > 0) {
            urlStr = [urlStr stringByAppendingFormat:@"?%@", paramStr];
        }
        return urlStr;
    }
    
    return url;
}
@end
