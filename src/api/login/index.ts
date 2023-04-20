import request from '@/config/axios'
import { getRefreshToken } from '@/utils/auth'
import type { UserLoginVO } from './types'

export interface SmsCodeVO {
  mobile: string
  scene: number
}

export interface SmsLoginVO {
  mobile: string
  code: string
}

// 登录
export const login = (data: UserLoginVO) => {
  return request.post({ url: '/system/auth/login', data })
}

// 刷新访问令牌
export const refreshToken = () => {
  return request.post({ url: '/system/auth/refresh-token?refreshToken=' + getRefreshToken() })
}

// 使用租户名，获得租户编号
export const getTenantIdByName = (name: string) => {
  return request.get({ url: '/system/tenant/get-id-by-name?name=' + name })
}

// 登出
export const loginOut = () => {
  return request.post({ url: '/system/auth/logout' })
}

// 获取用户权限信息
export const getInfo = () => {
  return request.get({ url: '/system/auth/get-permission-info' })
}

// 路由
export const getAsyncRoutes = () => {
  return [{
    "id": 1,
    "parentId": 0,
    "name": "系统管理",
    "path": "/system",
    "component": null,
    "componentName": null,
    "icon": "ep:tools",
    "visible": true,
    "keepAlive": true,
    "alwaysShow": true,
    "children": [{
      "id": 100,
      "parentId": 1,
      "name": "用户管理",
      "path": "user",
      "component": "system/user/index",
      "componentName": null,
      "icon": "ep:avatar",
      "visible": true,
      "keepAlive": true,
      "alwaysShow": true,
      "children": null
    }, {
      "id": 101,
      "parentId": 1,
      "name": "角色管理",
      "path": "role",
      "component": "system/role/index",
      "componentName": null,
      "icon": "ep:user-filled",
      "visible": true,
      "keepAlive": true,
      "alwaysShow": true,
      "children": null
    }, {
      "id": 102,
      "parentId": 1,
      "name": "菜单管理",
      "path": "menu",
      "component": "system/menu/index",
      "componentName": null,
      "icon": "ep:grid",
      "visible": true,
      "keepAlive": true,
      "alwaysShow": true,
      "children": null
    }, {
      "id": 105,
      "parentId": 1,
      "name": "字典管理",
      "path": "dict",
      "component": "system/dict/index",
      "componentName": null,
      "icon": "ep:list",
      "visible": true,
      "keepAlive": true,
      "alwaysShow": true,
      "children": null
    }, {
      "id": 107,
      "parentId": 1,
      "name": "通知公告",
      "path": "notice",
      "component": "system/notice/index",
      "componentName": null,
      "icon": "ep:bell-filled",
      "visible": true,
      "keepAlive": true,
      "alwaysShow": true,
      "children": null
    }]
  }];
  // return request.get({ url: '/system/auth/list-menus' })
}

//获取登录验证码
export const sendSmsCode = (data: SmsCodeVO) => {
  return request.post({ url: '/system/auth/send-sms-code', data })
}

// 短信验证码登录
export const smsLogin = (data: SmsLoginVO) => {
  return request.post({ url: '/system/auth/sms-login', data })
}

// 社交授权的跳转
export const socialAuthRedirect = (type: number, redirectUri: string) => {
  return request.get({
    url: '/system/auth/social-auth-redirect?type=' + type + '&redirectUri=' + redirectUri
  })
}
// 获取验证图片以及 token
export const getCode = (data) => {
  return request.postOriginal({ url: 'system/captcha/get', data })
}

// 滑动或者点选验证
export const reqCheck = (data) => {
  return request.postOriginal({ url: 'system/captcha/check', data })
}
