import { requestParamsToJSON } from '@/utils/ebenUtils'

const activateDeviceList = [
  {
    serial_no: 'T9S5WEJNG766HJ3',
    truename: '测试人员',
    nickname: '测试昵称',
    mobile: '13100001111',
    devicetype: 'device type test',
    email: 'tester@eben.cn',
    created_at: '2018-01-01 01:01:01',
    updated_at: '2018-03-03 03:03:03',
    area_name: '北京',
    amount: 'amount test',
    device: 'T9',
    branch: 'T9S',
    uid: '1',
    amounttype: 'amount type test'
  },
];

const deviceType = [
  { id: '1', type: 'T10Test' },
  { id: '1', type: 'T9Test' },
];

const sysVersion = [
  { id: '1', version: '195.betaTest' },
  { id: '2', version: '191.reTest' },
];

const statisticsUpgrade = [
  { version: '195.betaTest', type: 'T10Test', rate: '90%', rate_success: '60%' },
  { version: '191.reTest', type: 'T9Test', rate: '70%', rate_success: '20%' },
];

export default {
  // 模拟获取激活设备信息
  exportActivateDevice: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '查询成功',
      received: params,
      result: activateDeviceList
    };
  },

  // 获取所有设备型号
  getDeviceType: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '查询成功',
      received: params,
      result: deviceType
    };
  },

  // 获取所有系统版本
  getSysVersion: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '查询成功',
      received: params,
      result: sysVersion
    };
  },

  // 获取系统升级统计信息
  statisticsUpgrade: config => {
    const params = requestParamsToJSON(config.body);
    return {
      status: 200,
      message: '查询成功',
      received: params,
      result: {
        listarr: statisticsUpgrade,
        count: statisticsUpgrade.length
      }
    };
  },

}
