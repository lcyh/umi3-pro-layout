import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/notices');
}

// 获取菜单列表
export const getAuthList = async(): Promise<any> => {
  return request.get("/authList", {});
};