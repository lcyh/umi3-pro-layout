import React, { PropsWithChildren, useEffect } from 'react';
import { Button, Input } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
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
import Counter from '@/components/Counter';
import styles from './index.less';

const { TextArea } = Input;
type Prop = PropsWithChildren<RouteComponentProps> & AliveController;

const DemoPage = (props: any) => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const { drop } = useAliveController();
  console.log('demo-list-props-store', { props });

  useEffect(() => {
    // POP(goBack,点击左上角返回箭头),replace时清除上个页面的缓存,PUSH时,缓存当前页面
    if (props.history.action === 'POP') {
      drop('/demo/detail');
    }
    return () => {
      console.log('卸载-useEffect-props', props);
    };
  }, []);
  useActivate(() => {
    console.log('didActivate-激活-TestFunction: props', props);
  });

  useUnactivate(() => {
    console.log('willUnactivate-卸载-TestFunction: props', props);
  });
  const handleJump = () => {
    console.log('demo列表页-props', { props, history, location, match });
    history.push('/demo/detail');
  };
  const handleDropCache = () => {
    // 如果关闭激活中的 KeepAlive Tab，需要先离开当前路由
    // 触发 KeepAlive unactivated 后再进行 drop
    // const unlisten = history.listen(() => {
    //   unlisten();
    //   setTimeout(() => {
    //     dropScope('/demo/list');
    //   }, 60);
    // });
    history.push('/demo/detail');
    setTimeout(() => {
      // dropScope('/demo/list');
      drop('/demo/list');
      // clear();
    }, 60);
  };
  return (
    // <KeepAlive name="/demo/list" saveScrollPosition="screen">
    <div>
      <h1 className={styles.title}>函数组件-demo-列表页</h1>
      <h3>number:{props.number}</h3>
      <TextArea showCount maxLength={100} />
      <Counter />
      {Array(100)
        .fill('')
        .map((item, idx) => (
          <div key={idx}>demo-列表页-Item {idx + 1}</div>
        ))}
      <Button onClick={() => handleJump()}>
        缓存列表页数据后-》跳转详情页
      </Button>
      <Button onClick={() => handleDropCache()}>清除缓存-》跳转详情页</Button>
    </div>
    // </KeepAlive>
  );
};
export default DemoPage;
// export default KeepAliveComponent(Demo, '/demo/list', 'screen');
