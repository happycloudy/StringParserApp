const fs = require('fs')
const FindCommEles = require('./modules/FindCommEles')
const StopWatch = require('stopwatch-js')
const lineReader = require ('line-by-line-reader');
const array_timsort = require('array-timsort')

async function Init() {
    stopWatch = new StopWatch();
    let filepath = "../FileGenerator/input1.txt";
    let input
    await lineReader(filepath)
        .then(fileContent => {
            input = fileContent.lines
            input = input.filter((str)=> str != 'init')
        })
        .catch(err => {
            console.log(err);
        });

        
    await stopWatch.start();
    let ArrSortByLength = [...input.sort((a, b) => a.length < b.length ? -1 : 1)] // сортировка по длине строк
    // let ArrSortByLength = [...quickSort(input)]
    await stopWatch.stop();
    console.log("Время сортировки по длине" + stopWatch.duration()*1000 + 'мс\n' );
    
    
    await stopWatch.start();
    // let ArrSortByAlf = input.sort((a, b) => a.localeCompare(b)) // сорировка по алфавиту
    let ArrSortByAlf = [...quickSort(input)]
    await stopWatch.stop();
    console.log("Время сортировки по алфавиту" + stopWatch.duration()*1000 + 'мс\n' );
    
    await stopWatch.start();
    let ArrOfCommonElements = await FindCommEles(input, ArrSortByAlf[0]) // нахождение всех уникальных общих вхождений 
    await stopWatch.stop();
    console.log("Время нахождения вхождений" + stopWatch.duration()*1000 + 'мс\n' );



    let path = './outputSortByLength.txt'
    if (fs.existsSync(path)) fs.unlinkSync(path)
    ArrSortByLength.forEach((str) => {
        fs.appendFileSync('./outputSortByLength.txt', str + '\n', err => err) // запись в файл 
    })

    path = './outputSortByAlf.txt'
    if (fs.existsSync(path)) fs.unlinkSync(path)
    ArrSortByAlf.forEach((str) => {
        fs.appendFileSync('./outputSortByAlf.txt', str + '\n', err => err) // запись в файл 
    })

    path = './outputCommonElements.txt'
    if (fs.existsSync(path)) fs.unlinkSync(path)
    ArrOfCommonElements.forEach((str, ind) => {
        fs.appendFile('./outputCommonElements.txt', str + '\n', err => err) // запись в файл 
    })
    
}
Init() 


function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
}

function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function swap(items, firstIndex, secondIndex){
    const temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}