import React from 'react';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { history } from 'umi';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';

// import { autoFixContext } from 'react-activation';

// autoFixContext(
//   [require('react/jsx-runtime'), 'jsx', 'jsxs', 'jsxDEV'],
//   // @ts-ignore
//   [require('react/jsx-dev-runtime'), 'jsx', 'jsxs', 'jsxDEV'],
// );

//获取 初始状态
export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrent();
      return currentUser;
    } catch (error) {
      history.push('/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/login') {
    const { data } = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser: data,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}
