/*
 * @Description: 模拟竞态 : 执行更早但返回更晚的情况会错误的对状态值进行覆盖
 * 在 useEffect 中，可能会有进行网络请求的场景，我们会根据父组件传入的 id，去发起网络请求，id 变化时，会重新进行请求。
 */
import React, { useEffect, useState } from 'react';
// 模拟网络请求
const fetchData = (id: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const result = `id 为${id} 的请求结果`;
      resolve(result);
    }, Math.random() * 1000 + 1000);
  });
function Counter({ id }: { id: number }) {
  const [data, setData] = useState('请求中。。。');
  useEffect(() => {
    let didCancel = false;
    const getData = async () => {
      const result: any = await fetchData(id);
      if (!didCancel) {
        setData(result);
      }
    };
    getData();
    return () => {
      didCancel = true;
      console.log('这里什么时候执行的-componentUnmount'); // 这里什么时候执行的,不是子组件卸载时才会执行吗
    };
  }, [id]);
  return <p>result: {data}</p>;
}
function App() {
  const [id, setId] = useState(0);
  useEffect(() => {
    setId(10);
  }, []);
  // 传递 id 属性
  return <Counter id={id} />;
}
export default App;
