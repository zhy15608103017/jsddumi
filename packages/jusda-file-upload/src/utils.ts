export const sort_ascii = (obj) => {
  let arr = new Array();
  let num = 0;
  for (let i in obj) {
    arr[num] = i;
    num++;
  }
  let sortArr = arr.sort();
  let str = '';
  for (let i in sortArr) {
    str += sortArr[i] + '=' + obj[sortArr[i]] + '&';
  }
  //去除最后&字符串
  let char = '&';
  str = str.substring(0, str.length - 1);
  console.log('str>>>>', str);
  return str;
};
