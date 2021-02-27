const fs = require('fs')
const FindCommEles = require('./modules/FindCommEles')


async function Init() {
    fs.readFile('./input.txt',async (err,data) => {
        if(err) return console.log("Нету файла input.txt");
        let input = data.toString().split('\r\n')
        if(input.join('') == '') return console.log("Файл пустой");
        let ArrSortByLength = input.sort((a, b) => a.length < b.length? -1 : 1) // сортировка по длине строк
        fs.writeFile('./outputSortByLength.txt',ArrSortByLength.join('\r\n'),(err) => err?console.log(err):null) // запись в файл 

        let ArrSortByAlf = input.sort((a, b) => a.localeCompare(b)) // сорировка по алфавиту
        fs.writeFile('./outputSortByAlf.txt', ArrSortByAlf.join('\r\n'),(err) => err?console.log(err):null) // запись в файл

        let ArrOfCommonElements = await FindCommEles(input) // нахождение всех уникальных общих вхождений 
        fs.writeFile('./outputCommonElements.txt', ArrOfCommonElements.join('\r\n'),(err) => err?console.log(err):null) // запись в файл
    })
}

Init() 