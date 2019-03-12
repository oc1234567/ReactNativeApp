//
//  CRFoundationCommonDefine.h
//  FoundationFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import <BaseFramework/CRAppDefine.h>
#import "CRFoundationCommonUtil.h"

#define kWebappDirPrefixName @"webapp_work"

#define kWebAppDirName [kWebappDirPrefixName stringByAppendingFormat:@"_%@", getAppVersion()]

#define kWebAppDirPath  [kDocumentDir stringByAppendingFormat:@"/%@/",kWebAppDirName]

#define kCRNCommonJsBundleDirName           @"rn_common"
#define kCRNCommonJsBundleFileName          @"common_ios.js"

#define kCRNModuleName      @"CRNModuleName="
#define kCRNModuleType      @"CRNType=1"
