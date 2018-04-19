import { requestParamsToJSON } from '@/utils/ebenUtils'

const repositoryList = {
  1: {
    id: 1,
    url: 'http://www.test1.svn/aaa',
    urltype: 1,
    urlbranch: '',
    addtime: 1523382271,
    name: 'aaa项目'
  },
  2: {
    id: 2,
    url: 'http://www.test2.git/bbb',
    urltype: 2,
    urlbranch: 'master',
    addtime: 1523332271,
    name: 'bbb项目'
  }
};

const personList = {
  1: {
    id: 1,
    name: 'testa',
    aliasname: null,
    status: 1,
    cnname: '测试a',
  },
  2: {
    id: 2,
    name: 'testb',
    aliasname: '',
    status: 2,
    cnname: '测试b',
  },
  3: {
    id: 3,
    name: 'testc',
    aliasname: null,
    status: 1,
    cnname: '测试c',
  },
  4: {
    id: 4,
    name: 'testd',
    aliasname: 'testedd',
    status: 1,
    cnname: '测试d',
  }
};

export default {
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
}
