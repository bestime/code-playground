import request from '../index';

export function apiGetUserInfo() {
  return request({
    url: '/test/user/info',
    baseURL: '@server01.api',
  });
}
