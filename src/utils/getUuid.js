/**
 * 返回 4 位的随机字符串
 * @returns 
 */
function getStr4() {
  return Math.floor((Math.random() + 1) * 0x10000).toString(16).substring(1);
}

/**
 * 返回指定倍数的 4 位随机字符串
 * @param {*} n 
 * @param {*} eq 链接符 每 4 位
 * @returns 
 */
function getUuid(n = 1, eq = '') {
  const uuid = [];
  for(let i = 0; i < n; i++) {
    uuid.push(getStr4());
  }
  return uuid.join(eq);
}

export default getUuid;