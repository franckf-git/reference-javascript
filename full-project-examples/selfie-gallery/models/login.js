const { core } = require('./../database/config')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

const countUsers = async () => {
    const request = await core('users').count()
    return request[0]['count(*)']
}

const createUser = async (name, password) => {
    const passwordHash = await bcrypt.hash(password, 12)
    const insertUser = await core('users')
        .insert({
            id: uuid.v4(),
            name,
            password: passwordHash
        })
    return insertUser
}

const checkCredentials = async (name, password) => {
    const userExist = await core('users').select().where({ name })
    if (userExist[0] !== undefined) {
        const passwordStored = userExist[0].password
        const checkPassword = await bcrypt.compare(password, passwordStored)
        if (checkPassword) {
            return userExist[0].id
        }
    }
    return false
}

const searchNameFromID = async (iduser) => {
    try {
        const name = await core('users').select().where({ id: iduser })
        return name[0].name
    } catch (error) {
        return false
    }
}

const searchIDFromName = async (name) => {
    const uuid = await core('users').select().where({ name })
    return uuid[0].id
}

module.exports = { countUsers, createUser, checkCredentials, searchNameFromID, searchIDFromName }
