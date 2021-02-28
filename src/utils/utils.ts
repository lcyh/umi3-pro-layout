import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isDevelopment = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return false;
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * 获取 URL 参数
 * @param key  参数
 */
export const getQueryParams = (key: string) => {
  let urlParm = window.location.href.split("?")[1];
  let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
  if (urlParm) {
      let r = urlParm.match(reg);
      return r != null ? decodeURI(r[2]) : "";
  } else {
      return "";
  }
};