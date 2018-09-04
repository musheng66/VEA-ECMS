import { requestParamsToJSON } from '@/utils/ebenUtils'

const deviceType = [
  { id: '1', type: 'T10Test' },
  { id: '2', type: 'T9Test' },
];

const sysVersion = [
  { id: '11', version: '195.betaTest' },
  { id: '12', version: '191.reTest' },
];

const statisticsUpgrade = [
  { version: '195.betaTest', type: 'T10Test', rate: '90%', rate_success: '60%' },
  { version: '191.reTest', type: 'T9Test', rate: '70%', rate_success: '20%' },
];

export default {

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
