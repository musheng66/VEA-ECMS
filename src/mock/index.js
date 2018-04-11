import Mock from 'mockjs'
import loginAPI from './login'
import lines1000API from './lines1000'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo);

// lines1000相关
// 代码库管理
Mock.mock('http://lines1000apinew.eben.cn/manage/getProList', 'post', lines1000API.repositoryQuery);


export default Mock;
