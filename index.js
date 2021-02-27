const fs = require('fs')
const FindCommEles = require('./modules/FindCommEles')


async function Init() {
    // let input
    // try {
    //     input = fs.readFileSync('./input.txt').toString().split('\r\n') // чтение файла
    // } catch (error) {
    //     console.log("Нет файла input.txt в папке с index.js");
    //     return error
    // }
    
    fs.readFile('./input.txt',async (err,data) => {
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

Init() 