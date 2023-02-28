import axios from 'axios';
import serverURL from './libs/serverURL';

const axiosInstance = axios.create({
  baseURL: '',
});

/**
 * 项目网络请求入口
 * @param options 请求配置
 * @returns 请求结果
 */
export default function request<T>(
  options: RequestHttp.Base & {
    url: string;
  }
) {
  return axiosInstance<T>({
    baseURL: '',
    url: serverURL(options.baseURL, options.url),
  });
}

export async function requestJsonFile<T = any>(path: string) {
  return request<T>({
    baseURL: '@local',
    url: path,
  }).then(function (res) {
    return res.data;
  });
}
