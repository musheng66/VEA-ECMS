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

}
