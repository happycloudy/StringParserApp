const fs = require('fs')
const FindCommEles = require('./modules/FindCommEles')
const StopWatch = require('stopwatch-js')

async function Init() {
    stopWatch = new StopWatch();
    
    fs.readFile('./input.txt',async (err,data) => {
        if(err) return console.log("Нету файла input.txt");
        let input = data.toString().split('\n')
        console.log(data.toLocaleString());
        if(input.join('') == '') return console.log("Файл пустой");
        
        let ArrSortByLength = [...input.sort((a, b) => a.length < b.length? -1 : 1)] // сортировка по длине строк
        fs.writeFile('./outputSortByLength.txt',ArrSortByLength.join('\n'),(err) => err?console.log(err):null) // запись в файл 
        
        let ArrSortByAlf = input.sort((a, b) => a.localeCompare(b)) // сорировка по алфавиту
        fs.writeFile('./outputSortByAlf.txt', ArrSortByAlf.join('\n'),(err) => err?console.log(err):null) // запись в файл
        
        stopWatch.start();
        let ArrOfCommonElements = await FindCommEles(input, ArrSortByAlf[0]) // нахождение всех уникальных общих вхождений 
        stopWatch.stop();
        fs.writeFile('./outputCommonElements.txt', ArrOfCommonElements.join('\n'),(err) => err?console.log(err):null) // запись в файл
        
        console.log("Время выполнения " + stopWatch.duration() );
    })
    
}
Init() 