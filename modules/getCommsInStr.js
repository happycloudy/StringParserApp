module.exports = async function getCommsInStr(str,substr) { // функция нахождения одинаковых символа(ов) substr в строке str
    let indexOfCommElems = str.indexOf(substr)
    if(indexOfCommElems == -1) return false
    else return true
}
