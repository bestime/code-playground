import { envConfig } from '@/utils/common';

/**
 * 检测url相对路径必须以 “/” 开头
 * @param relativePath - 相对路径
 * @reutrns
 */
export function checkRelativePath(relativePath: string) {
  if (/^[^/]/.test(relativePath)) {
    console.error(`相对地址必须以 "/" 开头，错误地址为: ${relativePath}`);
  }
}

/**
 * 项目所有接口地址转换映射
 */
function parseServerMap(): Record<RequestHttp.ServerAlias, string> {
  const server01Origin = envConfig.server01.devProxy ? '/VITE_SERVER_01' : envConfig.server01.origin;
  return {
    '@local': envConfig.baseURL,
    '@server01.origin': server01Origin,
    '@server01.api': server01Origin + envConfig.server01.apiPrefix,
  };
}

const serverMap = parseServerMap();

/**
 * 项目中所有的地址转换入口。用于部署到任意目录
 * @param alias - 服务器前缀别名
 * @param relativePath - 相对路径
 * @returns 真实地址
 */
export default function serverURL(alias: RequestHttp.ServerAlias, relativePath: string) {
  checkRelativePath(relativePath);
  return serverMap[alias] + relativePath;
}
