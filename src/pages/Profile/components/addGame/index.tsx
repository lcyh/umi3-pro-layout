import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Option } = Select;
const gameTypeMapData: any = ['全部', '单游戏', '策略游戏'];

interface IValueProps {
  gameType?: string;
  game?: string;
}

interface IAddGameProps {
  // 共用一个 form实例
  form?: any;
  field?: any;
  index: number;
  value?: IValueProps[];
  onChange?: (val: any) => void;
}

const AddGame = ({
  form,
  field,
  index: FirstIndex,
  value = [],
  onChange,
}: IAddGameProps) => {
  const [secondIdnex, setSecondIndex] = useState(0);
  console.log('AddGame', { field, value });
  const [selectData, setSelectData] = useState<string[][]>([['1', '2']]);
  const triggerChange = (index: number, changedValue: any) => {
    if (onChange) {
      value[index] = {
        ...value[index],
        ...changedValue,
      };
      onChange(value);
      setSecondIndex(index);
    }
  };

  useEffect(() => {}, []);

  const onInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const gameVal = e.target.value || '';
    triggerChange(index, { game: gameVal });
  };

  const onSelectionChange = (index: number, selectVal: any) => {
    // triggerChange(index, { gameType: selectVal });
    if (selectVal === '单游戏') {
      selectData[index] = ['1', '2'];
    } else {
      selectData[index] = ['1'];
    }
    setSelectData([...selectData]);
  };

  return (
    <div className={styles['add-game']}>
      <Form.List name={[field.name, 'gameInfo']} initialValue={value}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
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
                    onChange={(e) => onSelectionChange(index, e)}
                  >
                    {(gameTypeMapData || []).map((item: any) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {(selectData[index] || []).map(
                  (item: any, innerIndex: number) => {
                    return (
                      <Form.Item
                        key={item}
                        fieldKey={item}
                        noStyle
                        shouldUpdate={(preForm, nextForm) => {
                          return preForm.profileInfo !== nextForm.profileInfo;
                        }}
                      >
                        {({ getFieldValue }) =>
                          item === '1' ? (
                            <Form.Item
                              {...field}
                              name={[field.name, `game${innerIndex}`]}
                              fieldKey={[field.fieldKey, `game${innerIndex}`]}
                              rules={[{ required: true, message: '请填写' }]}
                            >
                              {
                                <Input
                                  disabled={
                                    getFieldValue('profileInfo')![FirstIndex]
                                      ?.gameInfo[index]?.gameType === '策略游戏'
                                  }
                                  // onChange={(e) => onInputChange(index, e)}
                                  style={{ width: '150px' }}
                                  maxLength={8}
                                  placeholder="请填写"
                                />
                              }
                            </Form.Item>
                          ) : (
                            <Form.Item
                              {...field}
                              name={[field.name, `$game${index}`]}
                              fieldKey={[field.fieldKey, `$game${index}`]}
                              rules={[{ required: true, message: '请填写' }]}
                            >
                              {
                                <Select style={{ width: '150px' }}>
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
                {index !== 0 ? (
                  <Form.Item>
                    <DeleteOutlined
                      onClick={() => {
                        remove(field.name);
                        selectData.splice(index, 1);
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
                    add({ gameType: '全部' });
                    selectData.push(['1']);
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
