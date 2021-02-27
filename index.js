const fs = require('fs')


async function Init() {
    // let input
    // try {
    //     input = fs.readFileSync('./input.txt').toString().split('\r\n') // чтение файла
    // } catch (error) {
    //     console.log("Нет файла input.txt в папке с index.js");
    //     return error
    // }
    
    fs.readFile('./input.txt',(err,data) => {
        if(err) console.log(err);
        let input = data.toString().split('\r\n')
        let ArrSortByLength = input.sort((a, b) => a.length < b.length? -1 : 1) // сортировка по длине строк
        fs.writeFile('./outputSortByLength.txt',ArrSortByLength.join('\r\n'),(err) => err?console.log(err):null) // запись в файл 

        let ArrSortByAlf = input.sort((a, b) => a.localeCompare(b)) // сорировка по алфавиту
        fs.writeFile('./outputSortByAlf.txt', ArrSortByAlf.join('\r\n'),(err) => err?console.log(err):null) // запись в файл

        let ArrOfCommonElements = await FindCommEles(input) // нахождение всех уникальных общих вхождений 
        fs.writeFile('./outputCommonElements.txt', ArrOfCommonElements.join('\r\n'),(err) => err?console.log(err):null) // запись в файл
    })

    
}


async function FindCommEles(input) { // функция нахождение уникальных символа(ов), содержащихся в каждой строке
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
    console.log(CommEles);
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