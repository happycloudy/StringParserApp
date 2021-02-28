const fs = require('fs')


function Init() {
    let input
    try {
        input = fs.readFileSync('./input.txt').toString().split('\r\n') // чтение файла
    } catch (error) {
        console.log("Нет файла input.txt в папке с index.js");
        return error
    }
    let time = new Date().getTime()
    if(input.join('') == '') return console.log('Файл пустой')
    let ArrSortByLength = input.sort((a, b) => a.length < b.length? -1 : 1) // сортировка по длине строк
    fs.writeFileSync('./outputSortByLength.txt', ArrSortByLength.join('\r\n') ) // запись в файл 
    
    let ArrSortByAlf = input.sort((a, b) => a.localeCompare(b)) // сорировка по алфавиту
    fs.writeFileSync('./outputSortByAlf.txt', ArrSortByAlf.join('\r\n') ) // запись в файл
    
    let ArrOfCommonElements = FindCommEles(input) // нахождение всех уникальных общих вхождений 
    fs.writeFileSync('./outputCommonElements.txt', ArrOfCommonElements.join('\r\n') ) // запись в файл
    console.log("Время выполнения " + (new Date().getTime() - time + "мс"));
}


function FindCommEles(input) { // функция нахождение уникальных символа(ов), содержащихся в каждой строке
    let CommEles = []
    let shortestStr = FindShortest(input)
    let isComms = true
    let substr = 1

    while (substr <= shortestStr.length) {
        for (let j = 0; j < shortestStr.length; j++) {
            const char = shortestStr.substr(j,substr);
            for (let i = 0; i < input.length; i++) {
                const element = input[i];
                isComms = getCommsInStr(element, char)   
                if (isComms == false) break
            }
            if (isComms == true) CommEles.push(char)
        }
        substr++
    }
    CommEles = unique(CommEles)
    return CommEles
}


function unique(arr) { // функция нахождения уникальных элементов массива
    let result = [];
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
}


function FindShortest(arr){  // функция нахождения самой короткой строки в массиве
    let shortestStr = arr[0]
    arr.forEach(str => {
       if(shortestStr.length > str.length){
           shortestStr = str
       } 
    });
    return shortestStr
}


function getCommsInStr(str,substr) { // функция нахождения одинаковых символа(ов) substr в строке str
    let isComms = false
    let indexOfCommElems = str.indexOf(substr)
    if(indexOfCommElems == -1) return false
    else return true
}


Init() 