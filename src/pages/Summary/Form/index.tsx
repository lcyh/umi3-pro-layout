import React, { useState } from 'react';
import { Form, Input, Button, Tooltip, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { FieldData } from 'rc-field-form/lib/interface';
import styles from './index.less';
import PriceInput from '@/components/PriceInput';
import FormItemInline from '@/components/FormItemInline';

const { Option } = Select;

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
];

const gameMapData: any = ['狩猎时刻', '公主连结', '元神'];
const gameTypeMapData: any = ['全部', '单游戏', '策略游戏'];
const gameAccessMapData: any = ['3个月', '6个月', '9个月', '12个月'];
const testData = [
  {
    id: 1,
    gameType: '单游戏',
    game: '公主连结',
    gameAccess: '3个月',
    gameTime: '2021-02-01~2021-04-01',
    outDate: 1,
  },
  {
    id: 2,
    gameType: '联运游戏',
    game: '元神',
    gameAccess: '6个月',
    gameTime: '2021-02-01~2021-07-01',
    outDate: 0,
  },
];

const HomePage = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState<any>();
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

    const [sights, rowIndex, type] = changeField;
    const formValue = form.getFieldValue('sights');
    const currentChangeValue =
      sights &&
      rowIndex >= 0 &&
      type &&
      form.getFieldValue('sights')[rowIndex][type];
    if (type === 'gameType' && currentChangeValue) {
      setCurrentGameType(currentChangeValue);
    }
    console.log('onFieldsChange', {
      changedFields,
      allFields,
      formValue,
      currentChangeValue,
    });
  };

  const handleChange = () => {
    // form.setFieldsValue({ sights: [] });
  };

  const checkPrice = (rule: any, value: any) => {
    console.log('checkPrice-validator', { rule, value });

    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject('Price must be greater than zero!');
  };

  const handleRemove = (item: any) => {
    console.log('删除', item);
    const index = testData.findIndex((i) => i.id === item.id);
    testData.splice(index, 1);
    // 更新页面
    forceUpdate({});
  };
  return (
    <div className={styles['home']}>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onFieldsChange={onFieldsChange}
        autoComplete="off"
        scrollToFirstError
        // initialValues={{
        //   price: {
        //     number: 2,
        //     currency: 'rmb',
        //   },
        //   sights: [
        //     {
        //       gameType: '策略游戏',
        //       game: ['公主连结'],
        //     },
        //   ],
        // }}
      >
        <FormItemInline
          name="district"
          label="district"
          inline={true}
          tipsNode={
            <Tooltip title="Useful information">
              <a href="#API" style={{ margin: '0 8px' }}>
                描述文案不超过6个字符
              </a>
            </Tooltip>
          }
          rules={[{ required: true, message: 'Missing district' }]}
        >
          <Select
            options={areas}
            onChange={handleChange}
            style={{ width: 150 }}
          />
        </FormItemInline>
        <Form.Item
          name="area"
          label="Area"
          rules={[{ required: true, message: 'Missing area' }]}
          extra={
            <Tooltip title="Useful information">
              <a href="#API" style={{ margin: '0 8px' }}>
                Need Help?
              </a>
            </Tooltip>
          }
        >
          <Select
            options={areas}
            onChange={handleChange}
            style={{ width: 150 }}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, validator: checkPrice }]}
        >
          <PriceInput />
        </Form.Item>
        <div className={styles['game-table-header']}>
          <Form.Item>游戏类型</Form.Item>
          <Form.Item>
            <div className={styles['header-label']}>游戏</div>
          </Form.Item>
          <Form.Item>
            <div className={styles['header-label']}>权限有效期</div>
          </Form.Item>
          <Form.Item>
            <div className={styles['header-label']}>权限到期时间</div>
          </Form.Item>
          <Form.Item>操作</Form.Item>
        </div>
        <div className={styles['game-table-content']}>
          {testData.map((item) => (
            <div key={item.id} className={styles['content-item']}>
              <Form.Item>{item.gameType}</Form.Item>
              <Form.Item>{item.game}</Form.Item>
              <Form.Item>{item.gameAccess}</Form.Item>
              <Form.Item style={{ color: item.outDate ? 'red' : 'inherit' }}>
                {item.gameTime}
                {item.outDate ? '(已到期)' : ''}
              </Form.Item>
              <Form.Item>
                <DeleteOutlined onClick={() => handleRemove(item)} />
              </Form.Item>
            </div>
          ))}
        </div>
        <Form.List name="sights">
          {(fields, { add, remove, move }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} className={styles['game-table-item']}>
                  <Form.Item noStyle shouldUpdate>
                    {() => (
                      <Form.Item
                        {...field}
                        initialValue={gameTypeMapData[0]}
                        name={[field.name, 'gameType']}
                        fieldKey={[field.fieldKey, 'gameType']}
                        rules={[
                          { required: true, message: 'Missing gameType' },
                        ]}
                      >
                        <Select>
                          {(gameTypeMapData || []).map((item: any) => (
                            <Option key={item} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item noStyle shouldUpdate>
                    {() => (
                      <Form.Item
                        {...field}
                        initialValue={[gameMapData[0]]}
                        name={[field.name, 'game']}
                        fieldKey={[field.fieldKey, 'game']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing game',
                            type: 'array',
                          },
                        ]}
                      >
                        <Select
                          mode="multiple"
                          disabled={
                            form.getFieldValue('sights')[index]?.gameType ===
                            '策略游戏'
                          }
                        >
                          {gameMapData.map((item: any) => (
                            <Option key={item} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item noStyle shouldUpdate>
                    {() => (
                      <Form.Item
                        {...field}
                        initialValue={gameAccessMapData[0]}
                        name={[field.name, 'accessValidity']}
                        fieldKey={[field.fieldKey, 'accessValidity']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing accessValidity',
                          },
                        ]}
                      >
                        <Select>
                          {(gameAccessMapData || []).map((item: any) => (
                            <Option key={item} value={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item {...field}>
                    <div>2021-2-19:12:00:00</div>
                  </Form.Item>
                  <Form.Item>
                    <DeleteOutlined onClick={() => remove(field.name)} />
                  </Form.Item>
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
