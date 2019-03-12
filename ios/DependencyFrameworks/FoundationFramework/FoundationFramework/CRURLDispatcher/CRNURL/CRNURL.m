//
//  CRNURL.m
//  FoundationFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CRNURL.h"

@interface CRNURL()

@property (nonatomic, copy) NSString *fileAbsolutePath;
@property (nonatomic, copy)  NSString *moduleName;
@property (nonatomic, copy)  NSString *title;
@property (nonatomic, strong) NSURL *bundleURL;
@property (nonatomic, assign) BOOL isHideNavBar;
@property (nonatomic, copy) NSString *inRelativeURLStr;
@property (nonatomic, strong) NSString *unBundleFilePath;
@property (nonatomic, assign) BOOL isHideDefaultLoading;
@property (nonatomic, strong) NSURL *backupH5URL;
@property (nonatomic, strong) NSString *productName;
@property (nonatomic, assign) BOOL isDisableBackWhenLoading;

@end

@implementation CRNURL

+ (BOOL)isCRNURL:(NSString *)url
{
    return [CRURLCommonUtil isCRNURL:url];
}

@end
