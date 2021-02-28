module.exports = async function FindShortest(arr){  // функция нахождения самой короткой строки в массиве
    let shortestStr = arr[0]
    arr.forEach(str => {
       if(shortestStr.length > str.length){
           shortestStr = str
       } 
    });
    return shortestStr
}