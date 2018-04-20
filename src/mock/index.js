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
Mock.mock('http://lines1000apinew.eben.cn/manage/addPro', 'post', lines1000API.repositoryAdd);
Mock.mock('http://lines1000apinew.eben.cn/manage/updPro', 'post', lines1000API.repositoryEdit);
Mock.mock('http://lines1000apinew.eben.cn/manage/delPro', 'post', lines1000API.repositoryDelete);

// 人员管理
Mock.mock('http://lines1000apinew.eben.cn/manage/getProOperallUserList', 'post', lines1000API.getProOperallUserList);
Mock.mock('http://lines1000apinew.eben.cn/manage/addProOperallUser', 'post', lines1000API.addProOperallUser);
Mock.mock('http://lines1000apinew.eben.cn/manage/updProOperallUser', 'post', lines1000API.updProOperallUser);
Mock.mock('http://lines1000apinew.eben.cn/manage/delProOperallUser', 'post', lines1000API.delProOperallUser);

export default Mock;
