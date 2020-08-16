const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { quickSort, bubbleSort, mergeSort, selectionSort, insertionSort, countingSort } = require('./algo')

exports.getInitial = (username) => {
    const initial = username.split('', 1)
    const initialUPP = initial[0].toUpperCase()
    return initialUPP
}

exports.getColor = async (username) => {
    const md5 = async () => {
        try {
            const { stdout, stderr } = await exec(`echo '${username}' | md5sum`)
            return stdout
        } catch (error) {
            console.error(error)
        }
    }

    const md5sum = await md5()
    const color = md5sum.split('', 6).join('').toString()
    return color
}

exports.generateText = async () => {
    const randomFromRangeText = (len) => {
        const rangeText = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789\n'
        let randomText = ''
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * rangeText.length)
            randomText += rangeText.substring(randomPoz, randomPoz + 1)
        }
        return randomText
    }
    const numbCarac = Math.random() * 10000
    const numbCaracFixed = numbCarac.toFixed()
    return randomFromRangeText(numbCaracFixed)
}

exports.sortingText = async (fileContent) => {
    const arrayLines = fileContent.split('\n')

    console.time('quickSort')
    const resultQuick = await quickSort(arrayLines).join('\n')
    console.timeEnd('quickSort')

    console.time('bubbleSort')
    const resultBubble = await bubbleSort(arrayLines).join('\n')
    console.timeEnd('bubbleSort')

    console.time('mergeSort')
    const resultMerge = await mergeSort(arrayLines).join('\n')
    console.timeEnd('mergeSort')

    console.time('selectionSort')
    const resultSelection = await selectionSort(arrayLines).join('\n')
    console.timeEnd('selectionSort')

    console.time('insertionSort')
    const resultInsertion = await insertionSort(arrayLines).join('\n')
    console.timeEnd('insertionSort')

    console.time('countingSort')
    const resultCounting = await countingSort(arrayLines).join('\n')
    console.timeEnd('countingSort')

    return resultCounting

}
