import React, { FC, useState, useEffect } from 'react';
import { Row, Col, Icon } from 'antd';
import _ from 'lodash';
import styles from './index.less';
import { number } from 'prop-types';

interface SingleCheckProps {
  label?: string;
  dataSource: { key: number | string; name: string }[];
  activeKey?: number | string;
  isShowMore?: boolean;
  onChange?: Function;
  className?: string;
  firstNumber?: number;
  [p: string]: any;
}

const SingleCheck: FC<SingleCheckProps> = ({
  label,
  dataSource = [],
  isShowMore = true,
  activeKey = '不限',
  onChange,
  firstNumber = 6,
  className,
}) => {
  const [pageState, setPageState] = useState({
    isShowMoreIcon: false,
    currentKey: activeKey,
  });
  useEffect(() => {
    if (activeKey === '不限') {
      setPageState({
        ...pageState,
        currentKey: activeKey,
      });
    }
  }, [activeKey]);
  const handleShowMoreIndustry = () => {
    const params = {
      ...pageState,
      isShowMoreIcon: !isShowMoreIcon,
    };
    setPageState(params);
  };
  const handleIndustyClick = (item: any) => {
    const backParams = dataSource.find((i) => i.key === item.key);
    onChange && onChange(backParams);
    if (item.key === currentKey) {
      return;
    }
    setPageState({ ...pageState, currentKey: item.key });
  };
  const { isShowMoreIcon, currentKey } = pageState;
  const renderIndustyData = isShowMore
    ? [
        dataSource.slice(0, firstNumber),
        dataSource.slice(firstNumber, dataSource.length),
      ]
    : [dataSource, []];
  const renderIndustyItem = _.map(renderIndustyData, (items, index) => {
    return (
      <Col
        span={24}
        key={index}
        className={`industryContainer ${
          index === 0 || isShowMoreIcon
            ? styles.showMoreIndustry
            : styles.hideMoreIndustry
        }`}
      >
        {items.map((item: any) => (
          <span
            key={item.key}
            className={[
              className,
              styles.textMargin,
              currentKey === item.key ? styles.active : '',
            ].join(' ')}
            // style={style}
            onClick={handleIndustyClick.bind(null, item)}
          >
            {item.name}
          </span>
        ))}
      </Col>
    );
  });
  return (
    <div className={styles['single-container']}>
      <Row style={{ padding: '10px 0' }}>
        {label && (
          <Col span={1}>
            <span className={styles['line-height-active']}>{label}:</span>
          </Col>
        )}

        <Col span={label || isShowMore ? 20 : 24} className={styles.textLeft}>
          <Row>{renderIndustyItem}</Row>
        </Col>
        {isShowMore && (
          <Col
            span={2}
            onClick={handleShowMoreIndustry}
            className={styles['more-industry']}
          >
            <span>
              {isShowMoreIcon ? '收起' : '更多'}
              {isShowMoreIcon ? <Icon type="up" /> : <Icon type="down" />}
            </span>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SingleCheck;
