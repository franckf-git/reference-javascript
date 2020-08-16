const { core } = require('./../database/config')

const registerImage = async (idUser, image) => {
    const registerImage = await core('images')
        .insert({
            idUser, image
        })
    return registerImage
}

const getImages = async () => {
    const getImages = await core('images').select()
    return getImages
}

module.exports = { registerImage, getImages }
