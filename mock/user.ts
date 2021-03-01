import { Request, Response } from 'express';
import menuData from './menu';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json({data:'123',code:0,message:''});
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return 'admin';
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    // if (!getAccess()) {
    //   res.status(401).send({
    //     data: {
    //       isLogin: false,
    //     },
    //     errorCode: '401',
    //     errorMessage: '请先登录！',
    //     success: true,
    //   });
    //   return;
    // }
    res.send({
      code:0,
      message:'',
      data:{
        username: 'Colin',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '111',
        email: 'antdesign@alipay.com',
        title: '交互专家',
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        hasRoutes:['/abtest/experiment','/abtest/audience'],
        access: getAccess(),
      }
    });
  },
  'GET /api/authList': (req: Request, res: Response) => {
    // if (!getAccess()) {
    //   res.status(401).send({
    //     data: {
    //       isLogin: false,
    //     },
    //     errorCode: '401',
    //     errorMessage: '请先登录！',
    //     success: true,
    //   });
    //   return;
    // }
    res.send({
      code:0,
      message:'',
      data:{
        authList:menuData
      }
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  //登录
  'POST /api/account/login': async (req: Request, res: Response) => {
    const { account, verifyCode, type='' } = req.body;  // type 暂时不用，可以传 手机号还是用户名
    await waitTime(2000);
    if (account === '17621204427' && verifyCode === '123') {
      res.send({
        code:0,
        data:{token:'##token'},
        status: 'ok',
        message:'success',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    res.send({
      code:9999,
      status: 'error',
      message:'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  //退出
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({code:0, data: {token:null},message:'success', success: true });
  },
  //注册
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  // 获取验证码
  'GET  /api/login/captcha': getFakeCaptcha,
};
