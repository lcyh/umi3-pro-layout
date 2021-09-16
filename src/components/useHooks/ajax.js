/*
 * @Author: changluo
 * @Description:
 */
// 封装自己的ajax函数
/* 参数1：{string} method 请求方法
    参数2：{string} url 请求地址
    参数2：{Object} params 请求参数
    参数3：{function} done 请求完成后执行的回调函数
*/
function ajax(method, url, params, done) {
  // 创建xhr对象，兼容写法
  var xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP');

  // 将method转换成大写
  method = method.toUpperCase();
  // 参数拼接
  var pair = [];
  for (var k in params) {
    pair.push(k + '=' + params[k]);
  }
  var str = pair.join('&');
  // 判断请求方法
  if (method === 'GET') {
    // 字符串拼接 或者 模板字符串
    url += '?' + str;
  }
  xhr.open(method, url);

  var data = null;
  if (method === 'POST') {
    // 需要请求头
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    data = str;
  }
  xhr.send(data);

  // 指定xhr状态变化事件处理函数
  // 执行回调函数
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {
      // 返回的应该是一个对象，这样客户端更好渲染
      done(JSON.parse(xhr.responseText));
    }
  };
}

//    调用自己写的ajax函数
ajax(
  'get',
  'http://localhost:3000/users',
  {
    name: 'zs',
    age: 45,
  },
  function (a) {
    console.log(a);
  },
);
