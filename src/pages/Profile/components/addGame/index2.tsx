import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Option } = Select;
const gameTypeMapData: any = ['全部', '单游戏', '策略游戏'];

interface IValueProps {
  gameType?: string;
  game?: string;
  contentList?: any[];
}

interface IAddGameProps {
  form: any;
  outField?: any;
  index: number;
  value?: IValueProps[];
  onChange?: (val: any) => void;
}

const AddGame = ({
  form,
  outField,
  index: FirstIndex,
  value = [],
  onChange,
}: IAddGameProps) => {
  console.log('AddGame', { outField, value });
  const [selectData, setSelectData] = useState<any[]>(value);

  useEffect(() => {}, []);

  const triggerChange = (
    secondIndex: number,
    innerIndex: number,
    changedValue: any,
  ) => {
    selectData[secondIndex]!.contentList[innerIndex]!.label = changedValue;
    if (onChange) {
      onChange(selectData);
    }
  };

  const onInputChange = (
    secondIndex: number,
    innerIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const changedValue = e.target.value || '';
    triggerChange(secondIndex, innerIndex, changedValue);
  };

  const onSubSelectChange = (
    secondIndex: number,
    innerIndex: number,
    selectVal: any,
  ) => {
    triggerChange(secondIndex, innerIndex, selectVal);
  };

  const onSelectionChange = (secondIndex: number, selectVal: any) => {
    console.log('selectVal', selectVal);

    if (selectVal === '单游戏') {
      selectData[secondIndex] = {
        gameType: selectVal,
        type: 'single',
        contentList: [
          { type: 'single', label: 'hah' },
          { type: 'zero', label: '11' },
        ],
      };
    } else if (selectVal === '全部') {
      selectData[secondIndex] = {
        gameType: selectVal,
        type: 'all',
        contentList: [{ type: 'single', label: '22' }],
      };
    } else {
      selectData[secondIndex] = {
        gameType: selectVal,
        type: 'other',
        contentList: [{ type: 'single', label: '33' }],
      };
    }
    onChange!(selectData);
    setSelectData([...selectData]);
  };
  console.log('111selectData', selectData);

  return (
    <div className={styles['add-game']}>
      <Form.List name={[outField.name, 'gameInfo']} initialValue={selectData}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, secondIndex) => (
              <div key={field.key} className={styles['game-table-item']}>
                <Form.Item
                  {...field}
                  name={[field.name, 'gameType']}
                  fieldKey={[field.fieldKey, 'gameType']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing gameType',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '150px' }}
                    onChange={(e) => onSelectionChange(secondIndex, e)}
                  >
                    {(gameTypeMapData || []).map((item: any) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {(selectData[secondIndex].contentList || []).map(
                  (item: any, innerIndex: number) => {
                    return (
                      <Form.Item
                        key={item.label + secondIndex + innerIndex}
                        fieldKey={item.label + secondIndex + innerIndex}
                        noStyle
                        shouldUpdate={(prevValues: any, nextValues: any) => {
                          return true;
                        }}
                      >
                        {({ getFieldValue }) =>
                          item.type === 'single' ? (
                            <Form.Item
                              {...field}
                              initialValue={item.label}
                              name={[
                                field.name,
                                `single-${item.label}-${innerIndex}`,
                              ]}
                              fieldKey={[
                                field.fieldKey,
                                `single-${item.label}-${innerIndex}`,
                              ]}
                              rules={[{ required: true, message: '请填写' }]}
                            >
                              {
                                <Input
                                  disabled={
                                    getFieldValue('profileInfo')![FirstIndex]
                                      ?.gameInfo[secondIndex]?.gameType ===
                                    '策略游戏'
                                  }
                                  onBlur={(e) =>
                                    onInputChange(secondIndex, innerIndex, e)
                                  }
                                  style={{ width: '150px' }}
                                  maxLength={8}
                                  placeholder="请填写"
                                />
                              }
                            </Form.Item>
                          ) : (
                            <Form.Item
                              {...field}
                              initialValue={item.label}
                              name={[
                                field.name,
                                `zero-${item.label}-${innerIndex}`,
                              ]}
                              fieldKey={[
                                field.fieldKey,
                                `zero-${item.label}-${innerIndex}`,
                              ]}
                              rules={[{ required: true, message: '请填写' }]}
                            >
                              {
                                <Select
                                  style={{ width: '150px' }}
                                  onChange={(e) =>
                                    onSubSelectChange(
                                      secondIndex,
                                      innerIndex,
                                      e,
                                    )
                                  }
                                >
                                  {(gameTypeMapData || []).map((item: any) => (
                                    <Option key={item} value={item}>
                                      {item}
                                    </Option>
                                  ))}
                                </Select>
                              }
                            </Form.Item>
                          )
                        }
                      </Form.Item>
                    );
                  },
                )}
                {secondIndex !== 0 ? (
                  <Form.Item>
                    <DeleteOutlined
                      onClick={() => {
                        remove(field.name);
                        selectData.splice(secondIndex, 1);
                        setSelectData([...selectData]);
                      }}
                    />
                  </Form.Item>
                ) : null}
              </div>
            ))}
            {fields.length <= 5 && (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add({
                      gameType: '全部',
                      contentList: [],
                    });
                    selectData.push({
                      gameType: '全部',
                      contentList: [],
                    });
                    setSelectData([...selectData]);
                  }}
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
    </div>
  );
};

export default AddGame;
