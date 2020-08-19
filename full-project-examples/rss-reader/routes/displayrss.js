'use strict'

const express = require('express')
const router = express.Router()
const Parser = require('rss-parser')
const parser = new Parser()
const db = require('../dbconnect')

router.get('/', function (req, res, next) {
  (async () => {
    const feed = await parser.parseURL('https://www.journalduhacker.net/rss')
    res.render('displayrss', {
      feed: feed
    })

    feed.items.forEach(item => {
      const date = item.pubDate
      const titre = item.title
      const lien = item.link
      db('rss')
        .insert({
          date: date,
          titre: titre,
          lien: lien
        })
        .then()
    })
  })()
})

module.exports = router
