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
const lines1000newapiServer = 'http://lines1000apinew.eben.cn';
// 代码库管理
Mock.mock(lines1000newapiServer + '/manage/getProList', 'post', lines1000API.repositoryQuery);
Mock.mock(lines1000newapiServer + '/manage/addPro', 'post', lines1000API.repositoryAdd);
Mock.mock(lines1000newapiServer + '/manage/updPro', 'post', lines1000API.repositoryEdit);
Mock.mock(lines1000newapiServer + '/manage/delPro', 'post', lines1000API.repositoryDelete);
// 人员管理
Mock.mock(lines1000newapiServer + '/manage/getProOperallUserList', 'post', lines1000API.getProOperallUserList);
Mock.mock(lines1000newapiServer + '/manage/addProOperallUser', 'post', lines1000API.addProOperallUser);
Mock.mock(lines1000newapiServer + '/manage/updProOperallUser', 'post', lines1000API.updProOperallUser);
Mock.mock(lines1000newapiServer + '/manage/delProOperallUser', 'post', lines1000API.delProOperallUser);

export default Mock;
