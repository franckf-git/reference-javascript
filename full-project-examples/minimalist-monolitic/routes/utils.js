const util = require('util')
const exec = util.promisify(require('child_process').exec)

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
