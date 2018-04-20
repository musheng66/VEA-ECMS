import { requestParamsToJSON } from '@/utils/ebenUtils'

const repositoryList = {
  1: {
    id: 1,
    url: 'http://www.test1.svn/aaa',
    urltype: 1,
    urlbranch: '',
    addtime: 1523382271,
    name: '测试数据aaa项目'
  },
  2: {
    id: 2,
    url: 'http://www.test2.git/bbb',
    urltype: 2,
    urlbranch: 'master',
    addtime: 1523332271,
    name: '测试数据bbb项目'
  }
};

const personList = {
  1: {
    id: 1,
    name: 'testa',
    aliasname: null,
    status: 1,
    cnname: '测试数据a',
  },
  2: {
    id: 2,
    name: 'testb',
    aliasname: '',
    status: 2,
    cnname: '测试数据b',
  },
  3: {
    id: 3,
    name: 'testc',
    aliasname: null,
    status: 1,
    cnname: '测试数据c',
  },
  4: {
    id: 4,
    name: 'testd',
    aliasname: 'testedd',
    status: 1,
    cnname: '测试数据d',
  }
};

export default {
  // 模拟代码库接口
  repositoryQuery: config => {
    const params = requestParamsToJSON(config.body);
    const returnData = {
      status: 200,
      message: '查询成功',
      result: {}
    };
    const listarr = [];
    if (params && params.pro_id && String(params.pro_id) !== '') {
      listarr.push(repositoryList[params.pro_id]);
    } else {
      listarr.push(repositoryList['1']);
      listarr.push(repositoryList['2']);
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
    const returnData = {
      status: 200,
      message: '查询成功',
      result: {}
    };
    const listarr = [];
    if (params && params.id && String(params.id) !== '') {
      listarr.push(personList[params.id]);
    } else {
      listarr.push(personList['1']);
      listarr.push(personList['2']);
      listarr.push(personList['3']);
      listarr.push(personList['4']);
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

}
