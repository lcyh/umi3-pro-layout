import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default () => {
  const [activeKey, setActiveKey] = useState(0);
  const tabsData = ['商品信息', '配送信息', '商品详情'];
  const changeTabs = (key: number) => {
    console.log('key', key);
    setActiveKey(key);
  };
  return (
    <div className={styles['abtest-variable']}>
      <div className={styles.body}>
        <div className={styles.title}>hello world111</div>
        <div className={styles['tabs-warpper']}>
          {tabsData.map((item, key) => (
            <div
              key={key}
              onClick={() => {
                changeTabs(key);
              }}
              className={classNames(
                styles.item,
                activeKey === key ? styles.active : null,
              )}
            >
              {item}
            </div>
          ))}
        </div>
        <div style={{ height: '200px' }}>ddddddddddd</div>
        <div style={{ height: '200px' }}>ccccccccccc</div>
        <div style={{ height: '200px' }}>hhhhhhhhhhh</div>
      </div>
    </div>
  );
};
