module.exports = async function unique(arr) { // функция нахождения уникальных элементов массива
    let result = [];
  
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
  
    return result;
}