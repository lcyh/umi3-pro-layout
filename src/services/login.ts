import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

// 登录
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/login/captcha?mobile=${mobile}`);
}

// 退出登录
export const sysLoginOut = async() => {
  //  清除保存的信息
  localStorage.removeItem('token');
  window.localStorage.removeItem('__USER_ACCOUNT__');
  return request.post('/login/outLogin');
};