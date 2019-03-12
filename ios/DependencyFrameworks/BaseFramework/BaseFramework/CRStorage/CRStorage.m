//
//  CRStorage.m
//  BaseFramework
//
//  Created by zhangyajun on 2019/3/11.
//  Copyright © 2019年 zhangyajun. All rights reserved.
//

#import "CRStorage.h"
#import "YYCache.h"
#import "CRAppDefine.h"
//#import "CTDataCrypt.h"
//#import "NSData+CTExtensions.h"
//#import "CTJsonKit.h"
//#import "GTMBase64.h"
//#import "NSString+CTExtensions.h"
#define kExpiresDateSuffix @"__cr__expiresdate"

@interface CRStorage()
{
    NSMutableArray *_cacheArray;
}

@end

@implementation CRStorage
static CRStorage *instance = nil;

+ (instancetype)sharedInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[CRStorage alloc] init];
    });
    
    return instance;
}

- (instancetype)init
{
    if (self = [super init]) {
        _cacheArray = [[NSMutableArray alloc] init];
    }
    return self;
}

-(YYCache *)cacheForDomain:(NSString *)domain
{
    @synchronized (instance) {
        if (domain.length == 0) {
            domain = @"common";
        }
        
        __block YYCache *cache = nil;
        [_cacheArray enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            YYCache *tmpCache = (YYCache *)obj;
            if ([tmpCache.name isEqualToString:domain]) {
                cache = tmpCache;
                *stop = YES;
            }
        }];
        
        NSString *path = [self cachePathWithDomain:domain];
        if (cache != nil) { //cache存在，cache对应文件不存在
            if (![[NSFileManager defaultManager] fileExistsAtPath:path]) {
                NSLog(@"cache file deleted===%@",path);
                [_cacheArray removeObject:cache];
                cache = nil;
            }
        }
        
        if (cache == nil) {
            cache = [[YYCache alloc] initWithPath:path];
            if (cache != nil) {
                [_cacheArray addObject:cache];
            }
        }
        
        return cache;
    }
    
}

-(NSString *)cachePathWithDomain:(NSString *)domain
{
    NSString *path = [[self storagePath] stringByAppendingPathComponent:domain];
    return path;
}

- (NSString *)storagePath{
    return [kDocumentDir stringByAppendingPathComponent:@"CRStorage"];
}

- (BOOL)containsObjectForKey:(NSString *)key inDomain:(NSString *)domain
{
    YYCache *cache = [self cacheForDomain:domain];
    NSString *expiresDateKey =[key stringByAppendingString:kExpiresDateSuffix];
    NSDate *expiresDate = (NSDate *)[cache objectForKey:expiresDateKey];
    if (expiresDate != nil && [expiresDate timeIntervalSinceReferenceDate] < [[NSDate date] timeIntervalSinceReferenceDate]){
        [cache removeObjectForKey:expiresDateKey];
        [cache removeObjectForKey:key];
        return NO;
    }
    return [cache containsObjectForKey:key];
}

- (nullable id<NSCoding>)objectForKey:(NSString *)key inDomain:(NSString *)domain
{
    YYCache *cache = [self cacheForDomain:domain];
    if ([self containsObjectForKey:key inDomain:domain]) {
        return [cache objectForKey:key];
    }
    return nil;
}
- (NSString *)objectForKey:(NSString *)key inDomain:(NSString *)domain isSecret:(BOOL)isSecret
{
    if (isSecret) {
//        key = [key MD5];
    }
    YYCache *cache = [self cacheForDomain:domain];
    if ([self containsObjectForKey:key inDomain:domain]) {
        id result = [cache objectForKey:key];
        if (isSecret) {
//加密方案未实现
//            NSData *encData = [NSData base64DecodeToData:result];
//            NSData *decData = [CTDataCrypt ctripDecryptData:encData];
//            result = [[NSString alloc] initWithData:decData encoding:NSUTF8StringEncoding];
        }
        return result;
    }
    return nil;
}

- (void)setObject:(nullable id<NSCoding>)object forKey:(NSString *)key inDomain:(NSString *)domain
{
    if (!key || ![key isKindOfClass:[NSString class]]) {
        return;
    }
    YYCache *cache = [self cacheForDomain:domain];
    [cache setObject:object forKey:key];
}

- (void)setObject:(NSString *)object forKey:(NSString *)key inDomain:(NSString *)domain withExpires:(double)timeInterval;
{
    if (!key || ![key isKindOfClass:[NSString class]]) {
        return;
    }
    [self setObject:object forKey:key inDomain:domain withExpires:timeInterval isSecret:NO];
}

- (void)setObject:(NSString *)object forKey:(NSString *)key inDomain:(NSString *)domain withExpires:(double)timeInterval isSecret:(BOOL)isSecret;
{
    if (!key || ![key isKindOfClass:[NSString class]]) {
        return;
    }
//加密无效
    if(isSecret){
//        key = [key MD5];
    }
    YYCache *cache = [self cacheForDomain:domain];
    NSDate* expiresDate = timeInterval > 0 ? [NSDate dateWithTimeIntervalSinceNow:timeInterval] : nil;
    NSString *expiresDateKey =[key stringByAppendingString:kExpiresDateSuffix];
    if (isSecret) {
        if ([object isKindOfClass:[NSString class]]){
//            NSData *encData = [CTDataCrypt ctripEncryptData:[object dataUsingEncoding:NSUTF8StringEncoding]];
//            object = [encData base64EncodeToString];
        }else{
//            NSData *encData = [CTDataCrypt ctripEncryptData:[object JSONDataForCtrip]];
//            object = [encData base64EncodeToString];
        }
    }
    [cache setObject:object forKey:key];
    if (expiresDate) {
        [cache setObject:expiresDate forKey:expiresDateKey];
    }
}

- (void)removeObjectForKey:(NSString *)key inDomain:(NSString *)domain
{
    YYCache *cache = [self cacheForDomain:domain];
    NSString *expiresDateKey =[key stringByAppendingString:kExpiresDateSuffix];
    NSDate *expiresDate = (NSDate *)[cache objectForKey:expiresDateKey];
    if (expiresDate != nil){
        [cache removeObjectForKey:expiresDateKey];
    }
    [cache removeObjectForKey:key];
}


- (void)removeAllObjectsInDomain:(NSString *)domain
{
    YYCache *cache = [self cacheForDomain:domain];
    [cache removeAllObjects];
}


- (NSDictionary *)allKeyAndValuesInDomain:(NSString *)domain{
    YYCache *cache = [self cacheForDomain:domain];
    NSDictionary *cacheObjects = [cache getAllKeyAndValues];
    NSMutableDictionary *result = [cacheObjects mutableCopy];
    for (NSString *key in cacheObjects.allKeys) {
        if ([key hasSuffix:kExpiresDateSuffix]) {
            [result removeObjectForKey:key];
        }
    }
    return result;
}

- (NSDictionary *)allKeyAndValuesInAllDomain{
    NSArray *allDomain = [self getAllDomains];
    NSMutableDictionary *allResult = [NSMutableDictionary dictionary];
    for (NSString *domain in allDomain) {
        YYCache *cache = [self cacheForDomain:domain];
        NSDictionary *cacheObjects = [cache getAllKeyAndValues];
        NSMutableDictionary *result = [cacheObjects mutableCopy];
        for (NSString *key in cacheObjects.allKeys) {
            if ([key hasSuffix:kExpiresDateSuffix]) {
                [result removeObjectForKey:key];
            }
        }
        [allResult setValue:result forKey:domain];
    }
    return allResult;
}

- (NSArray *)getAllDomains{
    NSString *storagePath = [self storagePath];
    NSArray *array = [[NSFileManager defaultManager] contentsOfDirectoryAtPath:storagePath error:nil];
    NSMutableArray *domains = [NSMutableArray array];
    for (NSString *item in array) {
        [domains addObject:item];
    }
    return domains;
}
@end
