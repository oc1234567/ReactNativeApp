#! /usr/bin/python
# -*- coding:utf-8 -*-


# 仅在Debug模式下在.app中写入一个文件，用来记录Bundle资源的version，判断是否copy

import os
import json
import shutil

global product_path
global app_path
global root
global script_path
global buildshell_path
global ctrip_json_path
global ctrip_json_lock_path
global resource_version_path
global repo_path


# 获取xcodebuild 环境变量
def get_global_env():
    global product_path
    global app_path
    global root
    global script_path
    global buildshell_path
    global ctrip_json_path
    global ctrip_json_lock_path
    global resource_version_path
    global repo_path

    product_path = os.environ.get("BUILT_PRODUCTS_DIR")
    app_path = os.path.join(product_path, os.environ.get("CONTENTS_FOLDER_PATH"))
    resource_version_path = os.path.join(app_path, "resource.lock")
    #root = os.path.join(os.environ.get("SRCROOT"), "../")
    root = os.environ.get("SRCROOT")
    root = os.path.abspath(root)
    script_path = os.path.join(root, "Script")
    buildshell_path = os.path.join(script_path, "buildshell")
    ctrip_json_path = os.path.join(buildshell_path, "ctrip.json")
    ctrip_json_lock_path = ctrip_json_path + ".lock"
    repo_path = os.path.join(root, "CTRepo")


def log_env():
    global product_path
    global app_path
    global root
    global script_path
    global buildshell_path
    global ctrip_json_path
    global ctrip_json_lock_path
    global resource_version_path
    global repo_path

    print "product_path = ", product_path
    print "app_path = ", app_path
    print "SRCROOT = ", root
    print "script_path = ", script_path
    print "buildshell_path = ", buildshell_path
    print "ctrip_json_path = ", ctrip_json_path
    print "ctrip_json_lock_path = ", ctrip_json_lock_path
    print "repo_path = ", repo_path
    print "resource_version_path = ", resource_version_path


# 获取到使用json的path
def get_ctrip_json_path():
    global ctrip_json_path
    global ctrip_json_lock_path

    if os.path.exists(ctrip_json_lock_path):
        return ctrip_json_lock_path
    return ctrip_json_path


# 是否copy资源
def should_copy_resource():
    global resource_version_path
    global repo_path

    if os.environ.get("CONFIGURATION") != "Debug":
        print "非Debug模式，copy全部资源"
        return True
    # 不能存在记录copy
    if not os.path.exists(resource_version_path):
        return True
    json_path = get_ctrip_json_path()
    ctrip_json = json.load(file(json_path))
    resource_json = json.load(file(resource_version_path))
    #首先检测依赖是否有变动
    current_libs = []
    origin_libs = resource_json.keys()

    for key , value in ctrip_json.items():
        if isinstance(value,dict) and value["hasResouceBundle"]  and  value["isLib"]:
            current_libs.append( key )

    if len(current_libs) != len(origin_libs):
        print "依赖有变动，需要copy资源"
        return True

    for key in current_libs:
        if key not in origin_libs:
            print "依赖有变动，需要copy资源"
            return True
    # 检测 Bundle 版本号变动

    for key in current_libs:
        version_path = os.path.join( repo_path , key  , "version" )
        with open(version_path , "r") as version_file:
            version_content = version_file.read()
            if version_content and version_content != resource_json[key]:
                print "Bundle版本号有变动，需要重新copy资源"
                return  True

    print "依赖和版本没有变动，不需要copy资源"
    return False





def copy_mcd_extend_json(repo_path , app_path):
    extend_file_name = "extendPamameters.json"
    bundleVersion_file_name = "BundleVersion.json"

    def copy_repo_json_to_app(extend_file_name):
        src = os.path.join( repo_path , extend_file_name )

        if not os.path.exists( src ):
            return
        dst = os.path.join( app_path , extend_file_name )

        if os.path.exists( dst ):
            os.remove( dst )

        shutil.copy( src , dst )

    copy_repo_json_to_app( extend_file_name )
    copy_repo_json_to_app( bundleVersion_file_name )





def copy_resource():
    global product_path
    global app_path
    global root
    global script_path
    global buildshell_path
    global ctrip_json_path
    global ctrip_json_lock_path
    global resource_version_path
    global repo_path

    copy_mcd_extend_json( repo_path , app_path)

    should_copy_bundle =  should_copy_resource()

    # 仅处理有资源的bundle
    # .app内部的解压
    # 源码依赖.app外部解压

    resource_version_dict = {}  # 记录bundle的版本号

    json_path = get_ctrip_json_path()
    ctrip_json = json.load(file(json_path))
    for key, value in ctrip_json.items():
        if isinstance(value, dict):
            if value["disable"]:  # 禁用的bundle直接跳过
                continue
            if value["hasResouceBundle"]:  # 含有资源
                isLib = value["isLib"]
                bundle_path = None
                bundle_name = key
                bundle_folder_name = bundle_name + "Bundle.bundle"
                if isLib :  # 处理bundle依赖
                    if not should_copy_bundle:
                        continue
                    bundle_path = os.path.join(app_path, bundle_folder_name)
                    if os.environ.get("CONFIGURATION") == "Debug":
                        bundle_verion_path = os.path.join(repo_path, bundle_name, "version")
                        if os.path.exists( bundle_verion_path ):
                            with open(bundle_verion_path, "r") as version_file:
                                version_content = version_file.read()
                                print "BundleName : ", bundle_name, " version : ", version_content
                                resource_version_dict[bundle_name] = version_content
                    copy_bundle_to_app(bundle_path, app_path, isLib)
                else:
                    bundle_path = os.path.join(product_path, bundle_folder_name)
                    print "copy { " ,bundle_name , " } 源码资源 "
                    copy_bundle_to_app(bundle_path, app_path, isLib)


    # 记录版本
    if should_copy_bundle:
        with open(resource_version_path, "w") as resource_version_file:
            json.dump(resource_version_dict, resource_version_file)


def copy_bundle_to_app(bundle_path, app_path, delete_bundle=True):
    #print "copy " , bundle_path , " to " , app_path , " delete : " ,delete_bundle

    if not os.path.exists( bundle_path ):
        "Warning : 不能存在 " , bundle_path
        return

    for file_name in os.listdir(bundle_path):
        file_path = os.path.join(bundle_path , file_name)
        dst = os.path.join( app_path , file_name)
        if file_name == "Info.plist":
            #print "不copy Info.plist"
            continue
        if os.path.isfile( file_path ):
            shutil.copy(file_path , dst)
        else:
            if os.path.exists(dst):
                shutil.rmtree(dst)

            shutil.copytree( file_path , dst )
    if delete_bundle:
        shutil.rmtree( bundle_path )


get_global_env()

log_env()

copy_resource()

exit(0)
