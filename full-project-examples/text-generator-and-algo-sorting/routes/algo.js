const quickSort = list => {
    if (list.length < 2)
        return list
    let pivot = list[0]
    let left = []
    let right = []
    for (let i = 1, total = list.length; i < total; i++) {
        if (list[i] < pivot)
            left.push(list[i])
        else
            right.push(list[i])
    }
    return [
        ...quickSort(left),
        pivot,
        ...quickSort(right)
    ]
}

const bubbleSort = list => {
    let lastIndex = list.length
    while (lastIndex > 0) {
        let lastModifiedIndex = 0
        for (let currentIndex = 1; currentIndex < lastIndex; currentIndex++) {
            // if the item at the previous index is greater than the item at the `currentIndex`, swap them
            if (list[currentIndex - 1] > list[currentIndex]) {
                // swap
                let temp = list[currentIndex - 1]
                list[currentIndex - 1] = list[currentIndex]
                list[currentIndex] = temp
                // save the index that was modified
                lastModifiedIndex = currentIndex
            }
        }
        // save the last modified index so we know not to iterate past it since all proceeding values are sorted
        lastIndex = lastModifiedIndex
    }
    return list
}

const mergeSort = (list) => {
    // No need to sort the array if the array only has one element or empty
    if (list.length <= 1) {
        return list
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(list.length / 2)
    // This is where we will be dividing the array into left and right
    const left = list.slice(0, middle)
    const right = list.slice(middle)
    // Using recursion to combine the left and right
    return merge(
        mergeSort(left), mergeSort(right)
    )
}
// Merge the two arrays: left and right
const merge = (left, right) => {
    let resultArray = [], leftIndex = 0, rightIndex = 0
    // We will concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex])
            leftIndex++ // move left array cursor
        } else {
            resultArray.push(right[rightIndex])
            rightIndex++ // move right array cursor
        }
    }
    // We need to concat to the resultArray because there will be one element left over after the while loop
    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex))
}

const selectionSort = (list) => {
    let len = list.length
    for (let i = 0; i < len - 1; i = i + 1) {
        let j_min = i
        for (let j = i + 1; j < len; j = j + 1) {
            if (list[j] < list[j_min]) {
                j_min = j
            }
        }
        if (j_min !== i) {
            swap(list, i, j_min)
        }
    }
    return list
}
const swap = (list, x, y) => {
    let temp = list[x]
    list[x] = list[y]
    list[y] = temp
}

const insertionSort = (list) => {
    let len = list.length
    let i = 1
    while (i < len) {
        let x = list[i]
        let j = i - 1
        while (j >= 0 && list[j] > x) {
            list[j + 1] = list[j]
            j = j - 1
        }
        list[j + 1] = x
        i = i + 1
    }
    return list
}

const countingSort = (list) => {
    let count = []
    let i, z = 0
    let max = Math.max(...list)
    // initialize counter
    for (i = 0; i <= max; i++) {
        count[i] = 0
    }
    for (i = 0; i < list.length; i++) {
        count[list[i]]++
    }
    for (i = 0; i <= max; i++) {
        while (count[i]-- > 0) {
            list[z++] = i
        }
    }
    return list
}

module.exports = { quickSort, bubbleSort, mergeSort, selectionSort, insertionSort, countingSort }