import React, { useState, useEffect } from 'react';
function useRequest(url: string) {
  let [offset, setOffset] = useState(0);
  let [loading, setLoading] = useState(false);
  let limit = 5;
  let [data, setData] = useState<any>([]);
  function loadMore() {
    setLoading(true);
    fetch(`${url}?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then(function (result) {
        console.log('result-offset', { result, offset });
        setData([...data, ...result]);
        setOffset(offset + result.length);
        setLoading(false);
      });
  }
  useEffect(loadMore, []);

  return [data, loadMore, loading];
}

export default useRequest;
