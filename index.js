const fs = require('fs')
const FindCommEles = require('./modules/FindCommEles')
const StopWatch = require('stopwatch-js')
const lineReader = require ('line-by-line')
const quickSort = require('./modules/FastSort')

async function Init() {
    stopWatch = new StopWatch();
    let filepath = "../FileGenerator/test.txt";
    let input = []
    lr = new lineReader(filepath);
    lr.on('error', function (err) {
        console.log(err);
    });
    lr.on('line', function (line) {
        lr.pause();
        input.push(line)
        lr.resume()
    });
    lr.on('end', async function () {
        await stopWatch.start();
        let ArrSortByLength = [...input.sort((a, b) => a.length < b.length ? -1 : 1)] // сортировка по длине строк
        await stopWatch.stop();
        console.log("Время сортировки по длине " + stopWatch.duration() * 1000 + 'мс\n');


        await stopWatch.start();
        let ArrSortByAlf = [...quickSort(input)] // сорировка по алфавиту
        await stopWatch.stop();
        console.log("Время сортировки по алфавиту" + stopWatch.duration() * 1000 + 'мс\n');

        await stopWatch.start();
        let ArrOfCommonElements = await FindCommEles(input, ArrSortByAlf[0]) // нахождение всех уникальных общих вхождений  
        await stopWatch.stop();
        console.log("Время нахождения вхождений" + stopWatch.duration() * 1000 + 'мс\n');



        let path = './outputSortByLength.txt'
        if (fs.existsSync(path)) fs.unlinkSync(path)
        ArrSortByLength.forEach((str) => {
            fs.appendFileSync('./outputSortByLength.txt', str + '\n', err => err) // запись в файл по длине
        })

        path = './outputSortByAlf.txt'
        if (fs.existsSync(path)) fs.unlinkSync(path)
        ArrSortByAlf.forEach((str) => {
            fs.appendFileSync('./outputSortByAlf.txt', str + '\n', err => err) // запись в файл по алфавиту
        })

        path = './outputCommonElements.txt'
        if (fs.existsSync(path)) fs.unlinkSync(path)
        ArrOfCommonElements.forEach((str, ind) => {
            fs.appendFile('./outputCommonElements.txt', str + '\n', err => err) // запись в файл общих вхождений
        })

    });
}
Init()


