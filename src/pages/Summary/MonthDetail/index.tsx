import React, { useState } from 'react';
import TreeTransfer from './components/TreeTransfer';

const treeData = [
  {
    key: '0-0',
    title: '0-0',
    children: [
      {
        key: '0-0-1',
        title: '0-0-1',
      },
    ],
  },
  {
    key: '0-1',
    title: '0-1',
    children: [
      { key: '0-1-0', title: '0-1-0' },
      { key: '0-1-1', title: '0-1-1' },
    ],
  },
  {
    key: '0-2',
    title: '0-2',
    children: [
      {
        key: '0-2-1',
        title: '0-2-1',
      },
    ],
  },
];
// 扁平展开 key为二级对应的key格式
const handleFlattenMapList = (data: any) => {
  let flattenList: any = {};
  data.forEach((item: any) => {
    if (item.children) {
      item.children.forEach((child: any) => {
        var uuid = child.key;
        flattenList[uuid] = {
          uuid,
          parentKey: item.key,
          parentTitle: item.title,
          ...child,
        };
      });
    }
  });
  return flattenList;
};
// 将数据源转化为 key为一级对应的key格式的map对象
const mapDataSource = (data: any) => {
  let map: any = {};
  data.forEach((item: any) => {
    map[item.key] = item;
  });
  return map;
};
const MonthDetail = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  let flattenMapList = handleFlattenMapList(treeData);
  let dataMap: any = mapDataSource(treeData);
  let transferDataSource: any = [];
  const flatten = (list: any = []) => {
    list.forEach((item: any) => {
      if (item.children.length > 0) {
        item.children.forEach((i: any) => {
          transferDataSource.push(i);
        });
      }
    });
  };
  flatten(treeData);
  const onChange = (keys: any) => {
    console.log('TreeTransfer-onChange', keys);
    setTargetKeys(keys);
  };
  return (
    <TreeTransfer
      flattenMapList={flattenMapList}
      dataSource={treeData}
      transferDataSource={transferDataSource}
      dataMap={dataMap}
      targetKeys={targetKeys}
      onChange={onChange}
    />
  );
};

export default MonthDetail;
