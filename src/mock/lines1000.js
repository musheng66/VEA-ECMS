import { requestParamsToJSON } from '@/utils/ebenUtils'

const repositoryList = [
  {
    id: 1,
    url: 'http://www.test1.svn/aaa',
    urltype: 1,
    urlbranch: '',
    addtime: 1523382271,
    name: '测试数据aaa项目'
  },
  {
    id: 2,
    url: 'http://www.test2.git/bbb',
    urltype: 2,
    urlbranch: 'master',
    addtime: 1523332271,
    name: '测试数据bbb项目'
  }
];

const personList = [
  {
    id: 1,
    name: 'testa',
    aliasname: null,
    status: 1,
    cnname: '测试数据a',
  },
  {
    id: 2,
    name: 'testb',
    aliasname: '',
    status: 2,
    cnname: '测试数据b',
  },
  {
    id: 3,
    name: 'testc',
    aliasname: null,
    status: 1,
    cnname: '测试数据c',
  },
  {
    id: 4,
    name: 'testd',
    aliasname: 'testedd',
    status: 1,
    cnname: '测试数据d',
  }
];

const staturlsList = [
  {
    addtime: 1523432429,
    dealtype: 3,
    domainurl: "http://test3.ereneben.com/test3/trunk/test3/res",
    id: 3,
    physicalurl: "/resource/test3/test3/26_big/test3/res",
    protype: null,
    updtime: 1523432429
  },
  {
    addtime: 1523432429,
    dealtype: 2,
    domainurl: "http://test2.ereneben.com/test/test2/test2/trunk/test2/src",
    id: 2,
    physicalurl: "/resource/test2/test2/26_big/test2/src",
    protype: null,
    updtime: 1523432429
  },
  {
    addtime: 1523432429,
    dealtype: 1,
    domainurl: "http://test.ereneben.com/test/test/test/trunk/test/build/test/bundles/release/res",
    id: 1,
    physicalurl: "/resource/test/test/26_big/test/build/test/bundles/release/res",
    protype: null,
    updtime: 1523432429
  }
];

const cbuList = [
  {
    addtime: 1526613115,
    endtime: "",
    starttime: "",
    statdata: [
      {
        addtime: 1526613115,
        bug_num: 11,
        cnname: "测试数据a",
        endtime: "",
        id: 1,
        oper_uname: "testa",
        starttime: "",
        tj_tln_sum: 1781,
        tj_type: "current",
        uid: 1
      },
      {
        addtime: 1526613115,
        bug_num: null,
        cnname: "测试数据b",
        endtime: "",
        id: 2,
        oper_uname: "testb",
        starttime: "",
        tj_tln_sum: 2307,
        tj_type: "current",
        uid: 2
      }
    ],
    tj_type: "current"
  },
  {
    addtime: 1526614115,
    endtime: "",
    starttime: "",
    statdata: [
      {
        addtime: 1526615115,
        bug_num: 4,
        cnname: "测试数据c",
        endtime: "",
        id: 3,
        oper_uname: "testc",
        starttime: "",
        tj_tln_sum: 781,
        tj_type: "current",
        uid: 3
      },
      {
        addtime: 1526633115,
        bug_num: null,
        cnname: "测试数据d",
        endtime: "",
        id: 4,
        oper_uname: "testd",
        starttime: "",
        tj_tln_sum: 207,
        tj_type: "current",
        uid: 4
      }
    ],
    tj_type: "current"
  },
];

export default {
  // 模拟代码库接口
  repositoryQuery: config => {
    const params = requestParamsToJSON(config.body);
    let returnData = {
      status: 200,
      message: '查询成功',
      received: params,
      result: {}
    };
    let listarr = [];
    if (params && params.pro_id && String(params.pro_id) !== '') {
      for (let item of repositoryList) {
        if(params.pro_id == item.id) {
          listarr.push(item);
          break;
        }
      }
    } else {
      listarr = repositoryList;
    }
    returnData.result = {
      count: listarr.length,
      listarr: listarr
    };
    return returnData;
  },
  repositoryAdd: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '模拟新增成功',
      received: params
    };
  },
  repositoryEdit: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '模拟编辑成功',
      received: params
    };
  },
  repositoryDelete: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '模拟删除成功',
      received: params
    };
  },
  // 模拟人员接口
  getProOperallUserList: config => {
    const params = requestParamsToJSON(config.body);
    let returnData = {
      status: 200,
      message: '查询成功',
      received: params,
      result: {}
    };
    let listarr = [];
    if (params && params.id && String(params.id) !== '') {
      for (let item of personList) {
        if(params.id == item.id) {
          listarr.push(item);
          break;
        }
      }
    } else {
      listarr = personList;
    }
    returnData.result = {
      count: listarr.length,
      listarr: listarr
    };
    return returnData;
  },
  addProOperallUser: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '模拟新增成功',
      received: params
    };
  },
  updProOperallUser: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '模拟编辑成功',
      received: params
    };
  },
  delProOperallUser: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '模拟删除成功',
      received: params
    };
  },
  // 模拟统计路径管理
  getProUrlList: config => {
    const params = requestParamsToJSON(config.body);
    const returnData = {
      status: 200,
      message: '查询成功',
      received: params,
      result: {}
    };
    let listarr = [];
    if (params && params.prourl_id && String(params.prourl_id) !== '') {
      for (let item of staturlsList) {
        if(params.prourl_id == item.id) {
          listarr.push(item);
          break;
        }
      }
    } else {
      listarr = staturlsList;
    }
    returnData.result = {
      count: listarr.length,
      listarr: listarr
    };
    return returnData;
  },
  updProUrl: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '模拟编辑成功',
      received: params
    };
  },
  // 模拟统计接口
  // 获取每次按人员统计的数据列表接口
  getProOperallCbuList: config => {
    const params = requestParamsToJSON(config.body);
    const returnData = {
      status: 200,
      message: '查询成功',
      received: params,
      result: {}
    };
    returnData.result = {
      count: cbuList.length,
      listarr: cbuList
    };
    return returnData;
  },
  // 更新人员bug数量
  forv4UpdProOperallCbu: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '模拟更新成功',
      received: params
    };
  },
  // 获取要导出的人员信息
  getProOperallCbuListForexcel: config => {
    const params = requestParamsToJSON(config.body);
    const returnData = {
      status: 200,
      message: '查询成功',
      received: params,
      result: []
    };
    for (let item of cbuList) {
      if(params.addtime == item.addtime) {
        returnData.result = item.statdata;
        break;
      }
    }
    return returnData;
  },
  // 获取所有下载文件的路径
  forv4DownSummarizelog: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '模拟成功',
      received: params
    };
  },
  // 统计比对接口
  forv4Stat: config => {
    const params = config.body; // 参数包含 && 符号，会引起转换失败，故不进行json转换
    return {
      status: 200,
      message: '模拟统计成功',
      received: params
    };
  },
}
