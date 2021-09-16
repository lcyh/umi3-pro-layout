import React, { useState, useEffect } from 'react';
interface RequestOptions {
  methodType: string;
  url: string;
  params: any;
  [key: string]: any;
}
function useRequest(url: string) {
  let [offset, setOffset] = useState(0);
  let [loading, setLoading] = useState(false);
  let limit = 5;
  let [data, setData] = useState<any>([]);

  function Ajax(methodType = 'GET', url: string, params?: any) {
    return new Promise((resolve, reject) => {
      // 1.创建Ajax实例
      let xhr = XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHttp');

      methodType = methodType.toUpperCase();
      let newParams = null,
        arr = [],
        str = '';
      if (
        methodType === 'GET' &&
        Object.prototype.toString.call(params) === '[object Object]'
      ) {
        for (let key in params) {
          arr.push(key + '=' + params[key]);
        }
        str = arr.join('&');
        url += '?' + str;
      }

      // 2.打开url请求,第三个参数 设置Ajax的同步异步，默认是true 异步
      xhr.open(methodType, url);

      if (methodType === 'POST') {
        // 3.设置请求头必须放在 open()后面
        xhr.setRequestHeader(
          'Content-type',
          'application/x-www-form-urlencoded;charset=utf-8',
        ); // 'application/x-www-form-urlencoded;charset=utf-8'
        newParams = JSON.stringify(params);
        console.log('newParams', newParams);
      }
      // 4.事件监听：一般监听的都是readystatechange事件(Ajax状态改变事件)，基于这个事件可以获取服务器返回的响应头响应主体
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status <= 300) {
            console.log('xhr.responseText', xhr.responseText);
            let result: any = JSON.parse(xhr.responseText);
            resolve(result);
            return;
          }
          reject(xhr.responseText);
        }
      };
      // 5.发送Ajax请求,参数为请求主体对象
      xhr.send(newParams);
    });
  }
  function loadMore() {
    setLoading(true);
    Ajax('get', url, { offset, limit })
      // fetch(`${url}?offset=${offset}&limit=${limit}`)
      // .then((res) => res.json())
      .then(function (result: any) {
        console.log('result-offset', { result, offset });
        setData([...data, ...result]);
        setOffset(offset + result.length);
        setLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
  useEffect(loadMore, []);

  return [data, loadMore, loading];
}

export default useRequest;
