'use strict'

const express = require('express')
const router = express.Router()
const axios = require('axios')

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const urlapi = 'https://api.spacexdata.com/v3/launches/latest'
    const spaceXDetails = async (urlapi) => {
      try {
        const recuperation = await axios.get(urlapi)
        return [recuperation.data.details, recuperation.data.links.mission_patch, recuperation.headers]
      } catch (error) {
        console.log(error)
      }
    }
    await spaceXDetails(urlapi)
      .then((infos) => {
        if (infos === undefined) {
          res.status(200)
          res.render('spacex-page', { title: 'SpaceX', infosapi: "pas d'informations disponibles" })
        }
        const renduDeLaPage = {
          title: 'SpaceX',
          infosapi: `${infos[0]}`,
          imagebadge: `${infos[1]}`,
          headers: infos[2]
        }
        res.render('spacex-page', renduDeLaPage)
      })
  } catch (error) {
    res.render('spacex-page', {
      title: 'SpaceX',
      infosapi: "pas d'informations disponibles"
    })
    console.log(error)
  }
})
module.exports = router
