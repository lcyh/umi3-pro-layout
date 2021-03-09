import React, { FC, useState, useEffect } from 'react';
import { Divider, Form, Row, Col, Input } from 'antd';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import request from '@/utils/request';
import styles from './index.less';
import { cityData, hotCity, letterData } from './allcity';
import SingleCheck from '../SingleCheck';
import BtnAnchor from '../BtnAnchor';

interface CitySelectProps {
  currentCity: {
    key: string | number;
    name: string;
  };
  onHandleChange?: Function;
  [p: string]: any;
}
let allCityPriceData: any = [];
let dataObj: any = {};
let newArr: any = [];

const CitySelect: FC<CitySelectProps> = (props) => {
  const { currentCity: _currentCity } = props;
  const [visible, setVisible] = useState(false);
  const [currentCity, setCurrentCity] = useState<any>(_currentCity);
  const [cityData, setCityAllData] = useState<any[]>([]);
  const [form] = Form.useForm();
  const { onHandleChange } = props;

  const handleChange = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    request('/cityList', {
      method: 'post',
      data: {},
    }).then((res: any) => {
      const { code, data } = res;
      if (Object.is(code, 0)) {
        setCityAllData(data.provinceVos);
        allCityPriceData = data.provinceVos;
      }
    });
  }, []);

  useEffect(() => {
    onHandleChange && onHandleChange(currentCity);
  }, [currentCity]);

  const _setFindCity = (value: string) => {
    let filterFirstKeyData: any = [];
    let findCity: any = [];
    let findProice: any = [];
    allCityPriceData.forEach((firstItem: any) => {
      firstItem.province.forEach((secondItem: any) => {
        secondItem.children.find((thirdItem: any) => {
          if (thirdItem.areaName.includes(value)) {
            filterFirstKeyData.push(firstItem);
            return true;
          }
          return false;
        });
      });
    });

    filterFirstKeyData.forEach((item: any) => {
      if (!dataObj[item.key]) {
        newArr.push(item);
      }
    });
    // for (let i = 0; i < filterFirstKeyData.length; i++) {
    //   if (dataObj[filterFirstKeyData[i].key]) {
    //     dataObj[filterFirstKeyData[i].key] = dataObj[
    //       filterFirstKeyData[i].key
    //     ].concat(filterFirstKeyData[i].province);
    //   } else {
    //     dataObj[filterFirstKeyData[i].key] = [
    //       ...filterFirstKeyData[i].province,
    //     ];
    //   }
    // }
    // for (let p of dataObj) {
    //   newArr.push({
    //     key: p,
    //     province: p[1],
    //   });
    // }
    setCityAllData([...newArr]);
  };

  const handleSearchCity = () => {
    const data = form.getFieldValue('cityName');
    if (data) {
      _setFindCity(data);
    } else {
      setCityAllData(allCityPriceData);
    }
  };

  const handleClickCity = (value: any) => {
    const currentCity: any = {
      key: value.areaCode,
      name: value.areaName,
    };
    setCurrentCity(currentCity);
    setVisible(false);
  };
  const handleHotCitySelect = (value: any) => {
    setCurrentCity(value);
    setVisible(false);
  };
  const currentCityName: any =
    currentCity?.name && currentCity?.name.length > 4
      ? currentCity.name.slice(0, 4) + '...'
      : currentCity.name;

  return (
    <div className={styles['city-select-container']}>
      <Form form={form} name="control-hooks">
        <div className={styles['city-check-container']} onClick={handleChange}>
          <span className={styles['city-check']}>
            当前城市:{currentCityName}
          </span>
          <span className={styles['city-icon']}>
            {visible ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </span>
        </div>
        <div
          className={[
            styles['city-content'],
            visible ? styles['show'] : styles['hide'],
          ].join(' ')}
        >
          <header className={styles['header']}>
            <span className={styles['name']}>城市列表</span>
            <span className={styles['close']} onClick={handleChange}>
              <CloseCircleOutlined />
            </span>
          </header>
          <Divider style={{ marginTop: 10 }} />
          <section>
            <Row>
              <Col span={12}>
                <span className={styles['current-city']}>
                  当前城市:{currentCity.name}
                </span>
              </Col>
              <Col span={12}>
                <Form.Item label="" name="cityName">
                  <Input
                    placeholder="请输入城市中文"
                    onPressEnter={handleSearchCity}
                    addonAfter={
                      <span
                        onClick={handleSearchCity}
                        style={{ cursor: 'pointer', padding: 10 }}
                      >
                        搜索
                      </span>
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </section>
          <section>
            <SingleCheck
              dataSource={hotCity}
              // activeKey={0}
              className={styles['single-check-color']}
              isShowMore={false}
              onChange={handleHotCitySelect}
            />
            <BtnAnchor dataSource={letterData} />
          </section>
          <Divider style={{ marginTop: 10 }} />
          <section>
            <div className={styles['auto-scrollbar']}>
              {cityData.map((item: any, index) => {
                return (
                  <Row key={item.key} id={item.key}>
                    <Col span={2} style={{ fontSize: 28, color: '#ccc' }}>
                      {item.key}
                    </Col>
                    <Col span={22} style={{ margin: '10px 0' }}>
                      {(item.province || []).map((innerItem: any) => (
                        <Row key={innerItem.areaCode}>
                          <Col
                            span={5}
                            style={{ padding: '0 10px', fontWeight: 'bold' }}
                          >
                            {innerItem.areaName}
                          </Col>
                          <Col span={19}>
                            {_.isArray(innerItem.children) &&
                              innerItem.children.map(
                                (inner: any, index: number) => (
                                  <span key={inner.areaCode}>
                                    <span
                                      className={styles['city-hover']}
                                      onClick={handleClickCity.bind(
                                        null,
                                        inner,
                                      )}
                                    >
                                      {inner.areaName}
                                    </span>
                                    <span>
                                      {' '}
                                      {index ===
                                      innerItem.children.length - 1 ? (
                                        ''
                                      ) : (
                                        <Divider type="vertical" />
                                      )}
                                    </span>
                                  </span>
                                ),
                              )}
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                );
              })}
            </div>
          </section>
        </div>
      </Form>
    </div>
  );
};
export default CitySelect;
