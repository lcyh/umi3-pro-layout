import { Component } from 'react';
import { withActivation } from 'umi';
import Counter from '@/components/Counter';
import KeepAliveComponent from '@/components/KeepAliveComponent';

class HomePage extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    console.log('初始化componentDidMount-home类组件', this.props);
  }
  componentWillUnmount() {
    console.log('卸载home类组件');
  }
  componentDidActivate() {
    console.log('TestClass: componentDidActivate', this.props);
  }
  componentWillUnactivate() {
    console.log('TestClass: componentWillUnactivate');
  }
  render() {
    return (
      <div>
        <h1>Home---1</h1>
        <Counter />
        {Array(100)
          .fill('')
          .map((item, idx) => (
            <div key={idx}>Home Item {idx + 1}</div>
          ))}
      </div>
    );
  }
}
export default HomePage;
