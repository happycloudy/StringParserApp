const fs = require('fs')
const FindCommEles = require('./modules/FindCommEles')
const StopWatch = require('stopwatch-js')

async function Init() {
    stopWatch = new StopWatch();
    
    fs.readFile('../FileGenerator/test.txt',async (err,data) => {
        if(err) return console.log("Нету файла input.txt");
        let input = data.toString().split('\n')
        if(input.join('') == '') return console.log("Файл пустой");
        

        await stopWatch.start();
        let ArrSortByLength = [...input.sort((a, b) => a.length < b.length? -1 : 1)] // сортировка по длине строк

        let ArrSortByAlf = input.sort((a, b) => a.localeCompare(b)) // сорировка по алфавиту

        let ArrOfCommonElements = await FindCommEles(input, ArrSortByAlf[0]) // нахождение всех уникальных общих вхождений 
        await stopWatch.stop();



        let path = './outputSortByLength.txt'
        if(fs.existsSync(path)) fs.rmSync(path)
        ArrSortByLength.forEach((str)=>{
            fs.appendFileSync('./outputSortByLength.txt', str+'\n', err => err) // запись в файл 
        })

        path = './outputSortByAlf.txt'
        if(fs.existsSync(path)) fs.rmSync(path)
        ArrSortByAlf.forEach((str)=>{
            fs.appendFileSync('./outputSortByAlf.txt', str+'\n', err=>err) // запись в файл 
        })

        path = './outputCommonElements.txt'
        if(fs.existsSync(path)) fs.rmSync(path)
        ArrOfCommonElements.forEach((str,ind)=>{
            fs.appendFile('./outputCommonElements.txt', str+'\n', err=>err) // запись в файл 
        })
    
        console.log("Время выполнения " + stopWatch.duration() );
    })
    
}
Init() 
