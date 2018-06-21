import Moment from 'moment'

/**
 * 判断浏览器是否支持本地存储
 * @returns {boolean}
 */
export function isLocalStorageSupported() {
  const testKey = 'test';
  const storage = window.sessionStorage;
  try {
    storage.setItem(testKey, 'testValue');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 作者：陈楠酒肆
 * 链接：http://www.jianshu.com/p/ccbadea30e30
 * 來源：简书
 * 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
/* ----------------------------- cookie ----------------------------- */
/**
 * 存储cookie
 * @param name cookie名称
 * @param value cookie值
 * @param days 存放天数
 */
export function setCookie(name, value, days = 1000) {
  const eDate = new Date();
  eDate.setDate(eDate.getDate() + days);
  document.cookie = name + '=' + escape(value) + ((days == null) ? '' : ';expires=' + eDate.toGMTString());
}

/**
 * 获取cookie
 * @param name
 * @returns {*}
 */
export function getCookie(name) {
  let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

/**
 * 删除cookie
 * @param name
 */
export function delCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) document.cookie = name + '=' + cval + '';expires='' + exp.toGMTString();
}

/**
 * 作者：沐圣
 * 来源：网络
 */
/* ----------------------------- localStorage ------------------------------------ */
/**
 * 存放一条本地存储记录
 * @param name
 * @param content
 */
export function setStorage(name, content) {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  if (this.isLocalStorageSupported()) {
    // supported localStorage
    window.localStorage.setItem(name, content)
  } else {
    // unsupported, use cookie
    this.setCookie(name, content);
  }
}

/**
 * 根据名称获取本地存储的值
 * @param name
 */
export function getStorage(name) {
  if (!name) return;
  let getContent = false;
  if (this.isLocalStorageSupported()) {
    getContent = window.localStorage.getItem(name);
  } else {
    getContent = this.getCookie(name);
  }
  if (!getContent) return;
  try {
    // content有可能不是JSON字符串而是纯字符串
    return JSON.parse(getContent);
  } catch (e) {
    return getContent;
  }
}

/**
 * 删除指定name的本地存储值
 * @param name
 */
export function removeStorage(name) {
  if (!name) return;
  if (this.isLocalStorageSupported()) {
    window.localStorage.removeItem(name)
  } else {
    this.delCookie(name);
  }
}

/**
 * 设置页面标题
 * @param object
 */
export function setTitle(object) {
  this.setStorage('page-title', JSON.stringify(object));
}

/**
 * 获取页面标题
 * @returns {*}
 */
export function getTitle() {
  return this.getStorage('page-title');
}

/**
 * auto scroll to top
 */
export function scrollTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * 获取当前时间
 * @returns {number}
 */
export function getCurrentTimeMillis() {
  return (new Date()).getTime();
}
export function getCurrentTimeUTC() {
  return (new Date()).getUTCDate();
}
export function getCurrentTimeString() {
  const time = new Date();
  return time && Moment(time).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 格式化日期时间
 * @param time
 * @returns {*|string}
 */
export function dateConvert(time) {
  if (!Moment(time).isValid()) return time;
  // 判断位数
  let timeStr = String(time);
  timeStr = timeStr.slice(0, 13);
  // 秒级时间戳加长为毫秒级
  if (timeStr.length < 13) {
    let numTo13 = 13 - timeStr.length;
    let txtTo13 = '';
    for (let i = 1; i <= numTo13; i ++) {
      txtTo13 = txtTo13 + '0';
    }
    timeStr = timeStr + txtTo13;
  }
  time = Number(timeStr);
  return time && Moment(time).format('YYYY-MM-DD HH:mm:ss')
}
export function dayConvert(time) {
  if (!Moment(time).isValid()) return time;
  return time && Moment(time).format('YYYY-MM-DD')
}

/**
 * 正则验证邮箱
 * @param email
 * @returns {boolean}
 */
export function checkEmail(email) {
  return (/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/.test(email));
}

/**
 * 正则验证手机号
 * @param phone
 * @returns {boolean}
 */
export function checkPhone(phone) {
  return (/^1(3|4|5|7|8)\d{9}$/.test(phone));
}

/* ----------------------------- class ------------------------------------ */
/**
 * js源生实现jQuery的hasClass方法
 * @param obj 被操作的元素对象
 * @param cls 类名
 * @returns {boolean} 返回是否含有指定类名
 */
export function hasClass(obj, cls) {
  const obj_class = obj.className; // 获取 class 内容
  const obj_class_lst = obj_class.split(/\s+/); // 通过split空字符将cls转换成数组
  for (const x in obj_class_lst) {
    if (obj_class_lst[x] == cls) { // 循环数组, 判断是否包含cls
      return true;
    }
  }
  return false;
}

/**
 * js源生实现jQuery的addClass方法
 * @param obj 被操作的元素对象
 * @param cls 类名
 */
export function addClass(obj, cls) {
  if (this.hasClass(obj, cls)) return;
  const obj_class = obj.className; // 获取 class 内容
  const blank = (String(obj_class) !== '') ? ' ' : ''; // 判断获取到的 class 是否为空, 如果不为空在前面加个'空格'
  obj.className = obj_class + blank + cls; // 组合原来的 class 和需要添加的 class，替换原来的 class
}

/**
 * js源生实现jQuery的removeClass方法
 * @param obj 被操作的元素对象
 * @param cls 类名
 */
export function removeClass(obj, cls) {
  if (!this.hasClass(obj, cls)) return;
  let obj_class = ' ' + obj.className + ' '; // 获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
  obj_class = obj_class.replace(/(\s+)/gi, ' '); // 将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
  let removed = obj_class.replace(' '+cls+' ', ' '); // 在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
  removed = removed.replace(/(^\s+)|(\s+$)/g, ''); // 去掉首尾空格. ex) 'bcd ' -> 'bcd'
  obj.className = removed; // 替换原来的 class.
}

/**
 * js源生实现字符串全替换方法
 * @param content 字符串
 * @param findText 被替换的字符
 * @param repText 替换字符
 */
export function replaceAll(content, findText, repText) {
  const regExp = new RegExp(findText,'g');
  if (!content || String(content) === '') return '';
  return content.replace(regExp, repText);
}

/**
 * 根据查询参数字符串分解为查询json
 * @param arg 字符串，例如：a=1&b=2或者带参数的url
 */
export function requestParamsToJSON(arg) {
  if (!arg || String(arg) === '') return null;
  const argArr = arg.split('?');
  // 判断是url或者是params
  if (argArr && argArr.length > 1) {
    arg = argArr.split('?')[1]
    if (!arg) {
      return null;
    }
  }
  return JSON.parse('{"' + decodeURIComponent(arg).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * 格式化文件大小
 * @param value
 * @returns {*}
 */
export function formatFileSize(value) {
  if(isNaN(value) || String(value) == '0'){
    return '0';
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const orginSize = parseFloat(value);
  let index = Math.floor(Math.log(orginSize) / Math.log(1024));
  let size = orginSize / Math.pow(1024, index);
  size = size.toFixed(2); // 保留的小数位数
  return size + unitArr[index];
}

