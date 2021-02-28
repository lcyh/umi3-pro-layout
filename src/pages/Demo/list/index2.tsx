import React, { PropsWithChildren, Component } from 'react';
import { Button, Input } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { withActivation, AliveController } from 'umi';
import KeepAliveComponent from '@/components/KeepAliveComponent';
import Counter from '@/components/Counter';
import styles from './index.less';

const { TextArea } = Input;
type Prop = PropsWithChildren<RouteComponentProps>;

@withActivation
class DemoPage extends Component<Prop, any> {
  constructor(props: Prop) {
    super(props);
  }
  componentDidMount() {
    console.log('初始化componentDidMount-home类组件');
  }
  componentWillUnmount() {
    console.log('卸载home类组件');
  }
  componentDidActivate() {
    console.log('TestClass: componentDidActivate');
  }
  componentWillUnactivate() {
    console.log('TestClass: componentWillUnactivate');
  }
  handleJump = () => {
    console.log('this.props', this.props);

    this.props.history.push('/demo/detail');
  };
  render() {
    // const { drop, dropScope, clear, getCachingNodes } = this.props;
    return (
      <div>
        <h1 className={styles.title}>demo-列表页</h1>
        <TextArea showCount maxLength={100} />
        <Counter />
        {Array(100)
          .fill('')
          .map((item, idx) => (
            <div key={idx}>demo-列表页-Item {idx + 1}</div>
          ))}
        <Button onClick={() => this.handleJump()}>跳转详情页</Button>
      </div>
    );
  }
}
// export default DemoPage;
export default KeepAliveComponent(DemoPage, '/demo/list', 'screen');
