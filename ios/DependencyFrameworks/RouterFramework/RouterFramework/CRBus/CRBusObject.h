//
//  CRBusObject.h
//  RouterFramework
//
//  Created by zhangyajun on 2019/3/7.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef void (^AsyncCallResult)(id retObj, NSError *error);

@interface CRBusObject : NSObject

@property (nonatomic, readonly) NSString *businessNamePrefixAndURLHost;


- (id)initWithHost:(NSString *)host;

/**
 *  数据总线，同步处理任务，需要子类重载
 *
 *  @param businessName 业务名
 *  @param params       参数列表，列表中参数类型为对象
 *
 *  @return 任务执行结果
 */
- (id)doDataJob:(NSString *)businessName
         params:(NSArray *)params;

/**
 *  数据总线，异步处理任务，需要子类重载
 *
 *  @param businessName 业务名
 *  @param params       参数列表，列表中参数类型为对象
 *  @param result       任务执行结果回调
 */
- (void)doAsyncDataJob:(NSString *)businessName
                params:(NSArray *)params
           resultBlock:(AsyncCallResult)result;

/**
 *  URL总线，同步处理任务，需要子类重载
 *
 *  @param url          业务URL
 *
 *  @return             URL执行的结果
 */
- (id)doURLJob:(NSURL *)url;

/**
 *  URL总线，异步处理任务，需要子类重载(不建议使用)
 *
 *  @param url          业务URL
 *  @param result       任务执行结果回调
 */
- (void)doAsyncURLJob:(NSURL *)url resultBlock:(AsyncCallResult)result;

/**
 *  启动服务完成，to be override
 */
- (void)appBootServiceFinished;

@end

NS_ASSUME_NONNULL_END
