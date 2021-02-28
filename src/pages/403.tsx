import React, { PureComponent } from 'react';
import { Result, Button } from 'antd';
export interface UnauthorizedProps {}

class Unauthorized extends PureComponent<UnauthorizedProps, {}> {
  constructor(props: UnauthorizedProps) {
    super(props);
    this.state = {};
  }

  handleToHome = () => {
    window.location.href = '/';
  };

  render() {
    return (
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问此页面。"
        extra={
          <Button type="primary" onClick={this.handleToHome}>
            去首页
          </Button>
        }
      />
    );
  }
}

export default Unauthorized;
