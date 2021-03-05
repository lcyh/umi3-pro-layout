# CustomColumn 自定义看可见列和筛选项组件使用

## 使用代码

```JSX
import React, { useState } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import CustomColumn from '@/components/CustomColumn';

const Audience = (props: any) => {
  const [visible, SetVisible] = useState(false);
  const onBtnClick = () => {
    SetVisible(true);
  };
  return (
    <div className={styles['abtest-audience']}>
      <h1 className={styles.title}>这是abtest-audience页面---</h1>
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

```

## 组件props
+ api: 弹窗内部列表的接口地址和入参
+ onOk: 确定的点击事件
+ onCancel: 取消的点击事件
+ title: 弹窗的标题
+ desc?: 弹窗内的文案描述，置于表格上方
+ visible: 弹窗的显示隐藏
+ dataFormat?: 弹窗内部列表数据的格式化处理，需处理成[{key, name, select}]的形式
+ onReset?: 重置按钮的事件，不传则代表重置为上次保存的操作
+ ResetText?: 重置按钮的文案
+ ColumnText?: 表格列头的文案
+ range?: 限制可勾选的个数，如[5, 7]，最少5个，最大7个

