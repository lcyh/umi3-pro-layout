/*
 * @Description:
 */
import React, { useEffect, useState } from 'react';

const RequestPage = () => {
  const [number, setNumber] = useState(0);
  const handleAdd = () => {
    setNumber(number + 1);
  };
  useEffect(() => {
    console.log('父组件-useEffect');
    return () => {
      console.log('父组件-componentUnmount');
    };
  }, [number]);

  return (
    <div>
      hooks+{number}
      <button onClick={handleAdd}>添加add</button>
    </div>
  );
};

export default RequestPage;
