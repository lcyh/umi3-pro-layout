/*
 * @Author: changluo
 * @Description:express 起服务器模拟数据请求
 */

let express = require('express');
let app = express();
app.get('/api/users', function (req, res) {
  console.log('请求', { headers: req.headers });
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // res.header('Access-Control-Allow-Credentials', 'true');
  console.log('req', req);
  let offset = parseInt(req.query.offset || 0);
  let limit = parseInt(req.query.limit || 5);
  console.log('response', { offset, limit });
  let result = [];
  for (let i = offset; i < offset + limit; i++) {
    result.push({ id: i + 1, name: `name_${i + 1}` });
  }
  setTimeout(() => {
    res.json(result);
  }, 3000);
});
app.listen(3000, () => {
  console.log('3000端口启动了...');
});
