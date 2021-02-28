import React, { useState, useRef } from 'react';
import { message, Button, Input, Tag } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  game_status?: string;
  editable?: boolean;
  status?: string;
  title?: string;
  decs?: string;
  state?: any[];
  created_at?: string;
  children?: DataSourceType[];
};

let defaultData: DataSourceType[] = [
  {
    id: 624748504,
    game_status: 'single',
    title: '活动名称一',
    decs: '这个活动真好玩',
    status: '元神',
    state: [{ key: 'woman', label: '川妹子' }],
    created_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    game_status: 'multiple',
    title: '活动名称二',
    decs: '这个活动真好玩',
    status: '公主联结',
    state: [{ key: 'man', label: '西北汉子' }],
    created_at: '2020-05-26T08:19:22Z',
  },
];

const columns: ProColumns<DataSourceType>[] = [
  {
    title: '活动名称',
    dataIndex: 'title',
    width: '30%',
    editable: (text, record) => {
      return record.editable!;
    },
  },
  {
    title: '游戏类型',
    key: 'game_status',
    dataIndex: 'game_status',
    editable: (text, record) => {
      return record.editable!;
    },
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      single: {
        text: '单游戏',
        status: 'single',
      },
      multiple: {
        text: '多游戏',
        status: 'multiple',
      },
    },
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    editable: (text, record) => {
      return record.editable!;
    },
  },
  {
    title: '描述',
    dataIndex: 'decs',
    editable: (text, record) => {
      return record.editable!;
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '操作',
    valueType: 'option',
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item, index) => {
      return item.id;
    }),
  );
  defaultData = defaultData.map((item) => ({ ...item, editable: false }));

  return (
    <ProForm<{
      name: string;
      company: string;
    }>
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
      }}
      initialValues={{
        name: '蚂蚁设计有限公司',
        useMode: 'chapter',
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText
          width="md"
          name="company"
          label="我方公司名称"
          placeholder="请输入名称"
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="主合同编号" />
      <ProForm.Item
        label="数组数据"
        name="dataSource"
        initialValue={defaultData}
        trigger="onValuesChange"
      >
        <EditableProTable<DataSourceType>
          rowKey="id"
          actionRef={actionRef}
          toolBarRender={false}
          columns={columns}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            position: 'bottom',
            record: () => ({
              id: Date.now(),
            }),
            creatorButtonText: '添加',
          }}
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,
            actionRender: (row, text, dom) => {
              // console.log('row, text, dom', { row, text, dom });
              return [dom.delete];
            },
          }}
        />
      </ProForm.Item>
    </ProForm>
  );
};
