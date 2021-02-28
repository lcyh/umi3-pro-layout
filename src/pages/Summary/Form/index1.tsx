import React, { useEffect } from 'react';
import { notification } from 'antd';
import { KeepAlive, useActivate, useUnactivate } from 'react-activation';

import Counter from '@/components/Counter';

const Home = (props: any) => {
  console.log('home-函数组件-props', props);
  console.log('获取环境变量-REACT_APP_ENV', process.env.REACT_APP_ENV);

  useEffect(() => {
    notification.info({
      message: '[Home] mounted',
    });

    return () => {
      notification.error({
        message: '[Home] unmounted',
      });
    };
  }, []);

  useActivate(() => {
    console.log('激活-[Home] activated');
    notification.success({
      message: '[Home] activated',
    });
  });
  useUnactivate(() => {
    console.log('未激活-[Home] unactivated');
    notification.warning({
      message: '[Home] unactivated',
    });
  });
  return (
    <KeepAlive name="/home" saveScrollPosition="screen">
      <div>
        <h1>Home</h1>
        <Counter />
        {Array(100)
          .fill('')
          .map((item, idx) => (
            <div key={idx}>Home Item {idx + 1}</div>
          ))}
      </div>
    </KeepAlive>
  );
};
export default Home;
