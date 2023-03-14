import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userMocker from './user'
import authMocker from './system/auth'
import dictMocker from './system/dict'

const mockModules: any[] = [...userMocker, ...authMocker, ...dictMocker]

// 读取所有ts文件，生成mock规则列表，过滤掉 _ 下划线开头文件
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
