const uniq = (chaine) => {
    const result = chaine.split("")
    result.sort()
    let obj = {}
    result.forEach((element) => {
        let addObject = new Object
        let occLetter = obj[element]
        if (obj[element]) {
            addObject[element] = occLetter + 1
        } else {
            addObject[element] = 1
        }
        obj = {...obj, ...addObject}
    })
    return obj
}
console.log(uniq('abcdabeacr'))

