import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  UpCircleOutlined,
} from '@ant-design/icons';
import { FieldData } from 'rc-field-form/lib/interface';
import styles from './index.less';
import AddGame from './components/addGame';

const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const gameMapData: any = ['狩猎时刻', '公主连结', '元神'];

const initVal = [
  {
    name1: '1111',
    name2: ['222'],
    name3: '333',
    gameList: [{ gameType: '单游戏', game: '哈哈哈' }],
  },
  {
    name1: '你好',
    name2: ['电风扇地方'],
    name3: '法国的',
    gameList: [{ gameType: '元神', game: '是德国的风格' }],
  },
];
const HomePage = () => {
  const [form] = Form.useForm();
  const [currentGameType, setCurrentGameType] = useState<any>();
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const onFinishFailed = (values: any) => {
    console.log('Received values of onFinishFailed:', values);
  };

  // form.list遍历出来多行,这里可以拿到对应控件的值
  const onFieldsChange = (
    changedFields: FieldData[],
    allFields: FieldData[],
  ) => {
    const changeField: any = changedFields[0].name;
    console.log('~~~~changeField', changeField);

    const [profileInfo, rowIndex, type] = changeField;
    const formValue = form.getFieldValue('profileInfo');
    const currentChangeValue =
      profileInfo &&
      rowIndex >= 0 &&
      type &&
      form.getFieldValue('profileInfo')[rowIndex][type];
    if (type === 'name1' && currentChangeValue) {
      setCurrentGameType(currentChangeValue);
    }
    console.log('onFieldsChange', {
      changedFields,
      allFields,
      formValue,
      currentChangeValue,
    });
  };

  return (
    <div className={styles['profile']}>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onFieldsChange={onFieldsChange}
        autoComplete="off"
        scrollToFirstError
        initialValues={{
          profileInfo: initVal,
        }}
      >
        <Form.List name="profileInfo">
          {(fields, { add, remove, move }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} className={styles['profile-item']}>
                  <Form.Item
                    name={[field.name, 'name1']}
                    label="字段名称1"
                    rules={[{ required: true, message: '请填写' }]}
                    {...formItemLayout}
                  >
                    {<Input maxLength={8} placeholder="请填写" />}
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'name2']}
                    label="字段名称2"
                    rules={[
                      { required: true, message: '请填写', type: 'array' },
                    ]}
                    {...formItemLayout}
                  >
                    <Select mode="multiple">
                      {(gameMapData || []).map((item: any) => (
                        <Option key={item} value={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'name3']}
                    label="字段名称3"
                    rules={[{ required: true, message: '请填写' }]}
                    {...formItemLayout}
                  >
                    {<TextArea maxLength={8} placeholder="请填写" />}
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'gameList']}
                    label="游戏类"
                    rules={[{ required: true, message: '请填写' }]}
                    {...formItemLayout}
                  >
                    {<AddGame field={field} index={index} />}
                  </Form.Item>
                  {fields && fields.length > 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        fontSize: 20,
                      }}
                    >
                      <DeleteOutlined onClick={() => remove(field.name)} />
                      <UpCircleOutlined onClick={() => move(index, --index)} />
                    </div>
                  )}
                </div>
              ))}
              {fields.length <= 5 && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HomePage;
