/*
 * @Author: changluo
 * @Description:
 */
import React, { useEffect, useRef, useState } from 'react';
import useSetXState from '@/components/useHooks/useSetXState';
const RequestPage = () => {
  const [number, setNumber] = useState(0);
  const [xstate, setXState] = useSetXState({ num: 0, name: 'hello' });
  // 第一次会执行里面的回调函数
  useEffect(() => {
    console.log('父组件-useEffect');
    setNumber(number + 3);
    return () => {
      console.log('父组件-componentUnMount');
    };
  }, []);
  const handleClick = () => {
    setXState({ num: xstate.num + 1 }, (xstate: any) => {
      console.log('setXState更新之后', xstate);
    });
  };
  console.log('父组件-render');
  return (
    <div>
      父组件:{number}
      父组件-num:{xstate.num}
      父组件-name:{xstate.name}
      <button onClick={handleClick}>add添加</button>
      <Counter num={number} />
    </div>
  );
};

function Counter(props: { num: number }) {
  const [count, setCount] = useState(props.num);
  useEffect(() => {
    console.log('子组件-useEffect-count', count);
    setCount(props.num); // setCount(props.num)
    return () => {
      console.log('子组件-componentUnMount');
    };
  }, [props.num]); // [props.num]
  console.log('子组件-render', { props, count });

  return (
    <>
      <p>子组件: {count}</p>
    </>
  );
}

export default RequestPage;
