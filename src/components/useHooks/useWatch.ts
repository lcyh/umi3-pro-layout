/*
 * @Author: changluo
 * @Description: useWatch(类似componentDidUpdate)
 */
import { useEffect, useRef } from 'react';
const useWatch = (callback: () => void, deps: any) => {
  let ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
    } else {
      callback();
    }
  }, [...deps]);
};
export default useWatch;
