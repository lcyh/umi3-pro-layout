import React, { useState } from 'react';
import { Transfer, Tree } from 'antd';
// Customize Table Transfer
const isChecked = (selectedKeys: any, eventKey: any) =>
  selectedKeys.indexOf(eventKey) !== -1;

// 判断是否点击的根节点
const isRootNode = (all: any, eventKey: any) => {
  return !all[eventKey];
};

// 处理根结点的多选
const handleChosedRoot = (eventKey: any, all: any) => {
  let child: any = [];
  child = all[eventKey]?.children.map((item: any) => {
    return item.key;
  });
  console.log('eventKey-all', {
    eventKey,
    all,
    child,
  });
  return child;
};

const generateTree: any = (treeNodes: any = [], checkedKeys: any = []) =>
  treeNodes.map(({ children, ...props }: any) => ({
    ...props,
    disabled: checkedKeys.includes(props.key),
    children: generateTree(children, checkedKeys),
  }));

const TreeTransfer = ({
  dataSource,
  transferDataSource,
  flattenMapList,
  dataMap,
  targetKeys,
  ...restProps
}: any) => {
  const handleLeftSearch = (direction: any, value: string) => {
    console.log('handleLeftSearch', { direction, value });
  };
  return (
    <Transfer
      {...restProps}
      showSelectAll
      onSearch={handleLeftSearch}
      showSearch
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={(item) => item.title}
    >
      {({ direction, onItemSelect, onItemSelectAll, selectedKeys }) => {
        if (direction === 'left') {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              // checkStrictly
              defaultExpandAll
              checkedKeys={checkedKeys}
              selectedKeys={selectedKeys}
              treeData={generateTree(dataSource, targetKeys)}
              onCheck={(allsel: any, { node: { key: eventKey } }: any) => {
                if (isRootNode(flattenMapList, eventKey)) {
                  console.log(
                    'isRootNode',
                    isRootNode(flattenMapList, eventKey),
                  );
                  let children = [];
                  let hadcheckedList = allsel.filter(
                    (item: any) => !!flattenMapList[item],
                  );
                  console.log('hadcheckedList', hadcheckedList);
                  if (hadcheckedList.length > checkedKeys.length) {
                    children = handleChosedRoot(eventKey, dataMap);
                    onItemSelectAll(children, true);
                  } else {
                    children = handleChosedRoot(eventKey, dataMap);
                    onItemSelectAll(children, false);
                  }
                } else {
                  onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
                }
              }}
            />
          );
        }
      }}
    </Transfer>
  );
};
export default TreeTransfer;
