//
//  CRNURL.h
//  FoundationFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CRURLCommonUtil.h"

NS_ASSUME_NONNULL_BEGIN

@interface CRNURL : NSObject

@property (nonatomic, readonly) NSString *rnFilePath;
@property (nonatomic, readonly) NSString *rnModuleName;
@property (nonatomic, readonly) NSString *rnBundleURL;
@property (nonatomic, readonly) NSString *rnIsHideNavBar;
@property (nonatomic, readonly) NSString *rnTitle;
@property (nonatomic, readonly) NSString *rnInURLStr;
@property (nonatomic, readonly) BOOL rnIsHideDefaultLoading;
@property (nonatomic, readonly) BOOL isUnbundleRNURL;
@property (nonatomic, readonly) NSString *unBundleWorkDir;
@property (nonatomic, readonly) NSString *backupOnlineH5URL;
@property (nonatomic, readonly) NSString *packageName;
@property (nonatomic, readonly) BOOL rnIsDisableBackWhenLoading;

- (id)initWithPath:(NSString *)urlPath;

+ (BOOL)isCRNURL:(NSString *)url;

- (void)readUnbundleFilePathIfNeed;

+ (NSURL *)commonJSURL;

+ (NSString *)commonJSPath;

@end

NS_ASSUME_NONNULL_END
