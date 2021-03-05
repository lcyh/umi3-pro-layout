/*
 * @Author: changluo
 * @Description:express 起服务器模拟数据请求
 */

let express = require('express');
let app = express();
app.get('/api/users', function (req, res) {
  console.log('请求', { headers: req.headers });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  let offset = parseInt(req.query.offset || 0);
  let limit = parseInt(req.query.limit || 5);
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
