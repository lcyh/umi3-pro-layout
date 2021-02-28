import React from 'react';
import { Result, Button } from 'antd';

export default (props: any) => {
  const goBack = () => {
    window.location.href = '/';
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => goBack()}>
          Back Home
        </Button>
      }
    />
  );
};
