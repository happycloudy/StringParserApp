const getCommsInStr = require('./getCommsInStr')
const unique = require('./SetUnique')

module.exports = async function FindCommEles(input,shortestStr) { // функция нахождение уникальных символа(ов), содержащихся в каждой строке
    let CommEles = []
    let isComms = true
    let substr = 1
    while (substr <= shortestStr.length) {
        for (let j = 0; j < shortestStr.length-substr; j++) {
            const char = shortestStr.substr(j,substr);
            for (let i = 0; i < input.length; i++) {
                const element = input[i];
                isComms = await getCommsInStr(element, char)   
                if (isComms == false) break
            }
            if (isComms == true) CommEles.push(char)
        }
        substr++
    }
    CommEles = await unique(CommEles)
    return CommEles
}