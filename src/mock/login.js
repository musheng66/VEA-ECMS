import { param2Obj } from '@/utils'
import { requestParamsToJSON } from '@/utils/ebenUtils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '超级管理员',
    monitor: true,
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '编辑人员',
    monitor: true,
  }
};

export default {
  loginByUsername: config => {
    const params = requestParamsToJSON(config.body);
    let valid = false;
    let errorMessage = {};
    let data = {};
    switch (params.username) {
      case 'admin':
        if (params.password === '111111') {
          valid = true;
        } else {
          errorMessage.status = 403;
          errorMessage.message = '密码错误！';
        }
        break;
      case 'editor':
        if (params.password === '111111') {
          valid = true;
        } else {
          errorMessage.status = 403;
          errorMessage.message = '密码错误！';
        }
        break;
      default:
        errorMessage.status = 404;
        errorMessage.message = '用户名不存在！';
        break;
    }
    if (valid) {
      data = userMap[params.username];
      data.status = 200;
      data.message = '登录成功！';
      return data;
    } else {
      return errorMessage;
    }
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url);
    let valid = false;
    let errorMessage = {};
    let data = {};
    switch (token) {
      case 'admin':
        valid = true;
        break;
      case 'editor':
        valid = true;
        break;
      default:
        valid = false;
        break;

    }
    if (valid) {
      data = userMap[token];
      data.status = 200;
      data.message = '获取用户信息成功！';
      return data;
    } else {
      errorMessage.status = 401;
      errorMessage.message = '获取用户信息失败，请重新登录！';
      return errorMessage;
    }
  },
  logout: () => { return { status: 200 }; }
}
