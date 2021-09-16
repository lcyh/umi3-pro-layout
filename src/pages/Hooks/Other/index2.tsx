/*
 * @Author: changluo
 * @Description:
 */
import React, { useEffect, useState, useRef, useReducer } from 'react';
import useWatch from '@/components/useHooks/useWatch';

const RequestPage = (props: any) => {
  const [number, setNumber] = useState(0);
  const [, forceUpdate] = useState({});
  const [, forceUpdate1] = useReducer((x) => x + 1, 0);
  const ref = useRef(false);
  // 使用 useEffect 模拟 componentDidMount
  const handleAdd = () => {
    setNumber(number + 1);
    // forceUpdate1()
    console.log('add1', number);
  };
  // 第一次会执行里面的回调函数
  useEffect(() => {
    console.log('父组件-useEffect');
    setNumber(number + 3);
    return () => {
      console.log('componentUnMount');
    };
  }, []);
  // 第一次会执行里面的回调函数
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      console.log('ref.current', ref.current);
    }
    console.log('初始化', number);
  }, [number]);

  // 初始化第一次不会执行,后面依赖改变才会更新
  useWatch(() => {
    console.log('componentDidUpdate' + number);
  }, [number]);
  console.log('父组件-render-渲染了');

  return (
    <div>
      hooks+{number}
      <button onClick={handleAdd}>添加add</button>
    </div>
  );
};

export default RequestPage;
