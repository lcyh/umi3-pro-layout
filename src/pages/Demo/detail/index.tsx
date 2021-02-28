import React from 'react';
import {
  useHistory,
  useLocation,
  useRouteMatch,
  useActivate,
  useUnactivate,
  AliveController,
  KeepAlive,
  useAliveController,
} from 'umi';
import { Button, Input } from 'antd';
import styles from './index.less';

const { TextArea } = Input;

export default (props: any) => {
  console.log('详情页-props', props);
  return (
    <KeepAlive name="/demo/detail" saveScrollPosition="screen">
      <div>
        <h1 className={styles.title}>demo-详情页</h1>
        <TextArea showCount maxLength={100} />
        {Array(100)
          .fill('')
          .map((item, idx) => (
            <div key={idx}>详情页------{idx + 1}</div>
          ))}
        <Button
          className={styles['button']}
          onClick={() => props.history.goBack()}
        >
          返回
        </Button>
      </div>
    </KeepAlive>
  );
};
