/*
 * @Author: changluo
 * @Description: useState的升级版
 */

import { useState, useEffect, useRef } from 'react';
const useStateXState = (initialState: any) => {
  const [state, setState] = useState(initialState);
  console.log('state------', state);

  const isUpdate = useRef<Function>();
  const setXState = (newState: any, callback: Function) => {
    // setState会出发视图更新
    setState((preState: any) => {
      console.log('开始setState', typeof newState);
      isUpdate.current = callback;
      const currentState =
        typeof newState === 'function' ? newState(preState) : newState;
      console.log('currentState', currentState);
      return currentState;
    });
  };
  useEffect(() => {
    if (isUpdate.current) {
      console.log('setState已更新完成可以拿到最新state');
      console.log('----state----', state);

      isUpdate.current(state);
    }
  });
  return [state, setXState];
};
export default useStateXState;

// const [state,setXState] = useStateXState({num:0,name:''});

// setXState((preState:any)=>{
//     return {...preState,num:preState.num++}
// })
// setXState({name:'lc'},()=>{
//     console.log(state.name);
// })
