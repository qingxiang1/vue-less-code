/**
 * 返回 4 位的随机字符串
 * @returns
 */
function getStr4() {
  return Math.floor((Math.random() + 1) * 0x10000)
    .toString(16)
    .substring(1);
}

/**
 * 返回指定倍数的 4 位随机字符串
 * @param {*} n
 * @param {*} eq 链接符 每 4 位
 * @returns
 */
export function getUuid(n = 1, eq = '') {
  const uuid = [];
  for (let i = 0; i < n; i++) {
    uuid.push(getStr4());
  }
  return uuid.join(eq);
}

/**
 * 给定对象层级属性，改变值
 * @param {*} obj object
 * @param {*} path obj.a.b.c
 * @param {*} value 
 */
export function setObjAttr(obj, path, value) {
  if(!obj) return null;

  if(!path) return null;

  path.split('.').reduce((o, k, i, a) => (o[k] = a[i + 1] ? o[k] || {} : value), obj);
}
