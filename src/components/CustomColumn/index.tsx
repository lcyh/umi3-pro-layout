import React, { useEffect, useState } from 'react';
import { Modal, Button, Spin, message } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './DragItem';
import request from '@/utils/request';
import styles from './index.less';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

interface IField {
  key: string;
  name: string;
  select: boolean;
  checked: boolean;
  disabled: boolean;
}

interface IProps {
  api: { url: string; data: object };
  onOk: Function;
  onCancel: Function;
  title: string;
  desc?: string;
  range?: number[];
  visible: boolean;
  dataFormat?: Function;
  onReset?: Function;
  ResetText?: string;
  ColumnText?: string[];
  submitApi: { url: string; data: object };
  resetApi?: { url: string; data: object };
}

const CustomColumn = (props: IProps) => {
  const {
    api: { url, data },
    submitApi,
    resetApi,
    onOk,
    onCancel,
    title,
    desc = '',
    range,
    visible,
    dataFormat,
    onReset,
    ResetText = '重置',
    ColumnText = ['显示', '列名', '拖动调整顺序'],
  } = props;

  const [list, SetList] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [limitState, SetLimitState] = useState(0);

  useEffect(() => {
    visible && getData();
  }, [visible]);

  const getData = () => {
    !loading && SetLoading(true);
    request.post(url, {}).then((res) => {
      let formatData = res.data;
      if (dataFormat) {
        formatData = dataFormat(res.data);
      }
      const newSelected: CheckboxValueType[] = [];
      const newList = formatData.map((item: IField) => {
        if (item.select) {
          newSelected.push(item.key);
        }
        return { ...item, checked: item.select };
      });
      if (range) {
        if (newSelected.length === range[0]) {
          SetLimitState(-1);
        } else if (newSelected.length === range[1]) {
          SetLimitState(1);
        } else {
          SetLimitState(0);
        }
      }
      SetList(newList);
      SetLoading(false);
    });
  };

  const handleSelect = (checked: boolean, index: number) => {
    console.log('handleSelect', { list, checked, index });

    const len = list.filter((item: IField) => item.checked).length;
    const rangeLen = checked ? len + 1 : len - 1;
    (list[index] as any).checked = checked;
    const moveIndex = checked ? len : len - 1;
    const moveItem = list.splice(index, 1);
    list.splice(moveIndex, 0, moveItem[0]);
    SetList(list.concat());
    if (range) {
      if (rangeLen === range[0]) {
        SetLimitState(-1);
      } else if (rangeLen === range[1]) {
        SetLimitState(1);
      } else {
        SetLimitState(0);
      }
    }
  };

  const handleOk = () => {
    const result: string[] = [];
    list.forEach((item: IField) => {
      if (item.checked) {
        result.push(item.key);
      }
    });
    if (range && result.length < range[0]) {
      message.info(`筛选项不得少于${range[0]}项`);
      return;
    }
    request
      .post(submitApi.url, { data: { ...submitApi.data, apiNameList: result } })
      .then((res) => {
        onOk();
      });
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    const tmp = list[dragIndex];
    list.splice(dragIndex, 1);
    list.splice(hoverIndex, 0, tmp);
    SetList(list.concat());
  };

  const handleReset = () => {
    if (resetApi) {
      request.post(resetApi.url, { data: { ...resetApi.data } }).then((res) => {
        onReset && onReset();
      });
      return;
    }
    getData();
  };

  const renderFooter = () => {
    return (
      <div className={styles.footerwrap}>
        <span onClick={handleReset}>{ResetText}</span>
        <div>
          <span style={{ color: '#CCCCCC' }} onClick={handleCancel}>
            取消
          </span>
          <Button type="primary" onClick={handleOk}>
            确定
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={renderFooter()}
      closable={false}
      wrapClassName={styles.modalwrap}
      centered
    >
      {desc && <div className={styles.desc}>{desc}</div>}
      <div className={styles.wrap}>
        {loading ? (
          <Spin />
        ) : (
          <>
            <div className={styles.header}>
              <div>{ColumnText[0]}</div>
              <div>{ColumnText[1]}</div>
              <div>{ColumnText[2]}</div>
            </div>
            <div className={styles.container}>
              <DndProvider backend={HTML5Backend as any}>
                {list.map((item: IField, index: number) => (
                  <DragItem
                    key={item.key}
                    id={item.key}
                    text={item.name}
                    index={index}
                    onMove={handleMove}
                    value={item.key}
                    dragable={!item.disabled && item.checked}
                    checked={item.checked}
                    onCheck={handleSelect}
                    limitState={limitState}
                    disabled={item.disabled}
                  />
                ))}
              </DndProvider>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CustomColumn;
