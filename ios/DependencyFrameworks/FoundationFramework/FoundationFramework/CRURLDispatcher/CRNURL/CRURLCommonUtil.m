//
//  CRURLCommonUtil.m
//  FoundationFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CRURLCommonUtil.h"

@implementation CRURLCommonUtil

+ (BOOL)isCRNURL:(NSString *)url {
    NSString *lurl = url.lowercaseString;
    BOOL isCRNCommonURL = [lurl isEqualToString:[[self commonJSURL] absoluteString].lowercaseString];
    BOOL isCRNBizURL = [lurl containsString:kCRNModuleName.lowercaseString] &&
    [lurl containsString:kCRNModuleType.lowercaseString];
    return isCRNBizURL || isCRNCommonURL;
}

+ (NSURL *)commonJSURL {
    return [NSURL fileURLWithPath:[self commonJSPath]];
}

+ (NSString *)commonJSPath {
    return [kWebAppDirPath stringByAppendingFormat:@"%@/%@", kCRNCommonJsBundleDirName, kCRNCommonJsBundleFileName];
}

@end
