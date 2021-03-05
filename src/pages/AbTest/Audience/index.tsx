import React, { useState } from 'react';
import styles from './index.less';
import { Button, Form } from 'antd';
import CustomColumn from '@/components/CustomColumn';
import CitySelect from '@/components/CitySelect';

const Audience = (props: any) => {
  const [visible, SetVisible] = useState(false);
  const onBtnClick = () => {
    SetVisible(true);
  };
  return (
    <div className={styles['abtest-audience']}>
      <h1 className={styles.title}>这是abtest-audience页面---</h1>
      <CitySelect currentCity={{ key: '340000', name: '安徽省' }} />
      <Button onClick={onBtnClick}>设置可见列</Button>
      <CustomColumn
        visible={visible}
        api={{
          url: '/audience/list',
          data: {},
        }}
        submitApi={{ url: '/audience/list', data: {} }}
        dataFormat={(data: any) => {
          return data.map((item: any) => ({
            key: item.key,
            name: item.name,
            select: item.select,
          }));
        }}
        onOk={() => SetVisible(false)}
        onCancel={() => SetVisible(false)}
        title="弹窗标题"
        range={[5, 8]}
        ColumnText={['显示', '列名', '拖动调整顺序']}
      />
    </div>
  );
};

export default Audience;
