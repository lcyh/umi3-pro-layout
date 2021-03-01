import React from 'react';
import { Access, useAccess } from 'umi';
import logoPng from '@/assets/loginbg.png';
import styles from './index.less';
import { useStore } from '@/layouts/BasicLayout/context';

export default (props: any) => {
  const { route } = props;
  const access = useAccess();
  const store = useStore();
  console.log('experiment---', { props, access, store, route });

  return (
    <div className={styles['abtest-experiment']}>
      <h1 className={styles.title}>这是abtest-experiment页面---</h1>
      <h1 className={styles.title}>这是abtest-experiment页面---</h1>
      <h1 className={styles.title}>这是abtest-experiment页面---</h1>
      <h1 className={styles.title}>这是abtest-experiment页面---</h1>
      <Access
        accessible={access.canReadFoo}
        fallback={<div>Can not read foo content.</div>}
      >
        Foo content-可读.
      </Access>
      <Access
        accessible={access.canDeleteFoo(route)}
        fallback={<div>Can not delete foo.</div>}
      >
        Delete foo-删除.
      </Access>
      <Access
        accessible={access.canCustomFoo({ owerId: 111 })}
        fallback={<div>Can not delete foo.</div>}
      >
        Custom foo-自定义.
      </Access>
      <img
        src={logoPng}
        style={{ display: 'block', verticalAlign: 'middle', width: '100%' }}
      />
    </div>
  );
};
