/*
 * @Author: changluo
 * @Description:支持 formItem 横向和纵向展示
 */
import React, { CSSProperties, ReactNode } from 'react';
import { Form, Row, Col } from 'antd';
import styles from './index.less';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

interface IProps {
  name: string;
  label: string;
  rowStyle?: CSSProperties;
  colSpan?: number;
  inline?: boolean;
  tipsNode?: ReactNode;
  className?: string;
  [propName: string]: any;
}

const FormItemInline: React.FC<IProps> = ({
  name,
  label,
  rowStyle,
  colSpan,
  inline,
  tipsNode,
  className,
  children,
  ...res
}) => {
  const classNames = cx(
    {
      'form-item-inline': inline,
    },
    className,
  );
  return (
    // <Row style={rowStyle}>
    //   <Col span={colSpan}>
    <Form.Item
      className={classNames}
      name={name}
      label={label}
      extra={tipsNode}
      {...res}
    >
      {children}
    </Form.Item>
    //   </Col>
    // </Row>
  );
};

export default FormItemInline;
