const { quickSort, bubbleSort, mergeSort, selectionSort, insertionSort, countingSort } = require('./algo')

const numbersArray = [2, 8, 9, 1, 3, 10, 5, 4, 6, 7]

test('quickSort', async () => {
    expect(await quickSort(numbersArray)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('bubbleSort', async () => {
    expect(await bubbleSort(numbersArray)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('mergeSort', async () => {
    expect(await mergeSort(numbersArray)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('selectSort', async () => {
    expect(await selectionSort(numbersArray)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('insertSort', async () => {
    expect(await insertionSort(numbersArray)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

test('countingSort', async () => {
    expect(await countingSort(numbersArray)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})
