const path = require('path')
const vuesdudossier = path.join(__dirname, './views/')
const { exec } = require('child_process')
const fs = require('fs')

exports.source = async (req, res, next) => {
  try {
    const data = fs.readFileSync('log', 'utf8')
      .split(/\n/)
    res.render(vuesdudossier + 'index.ejs', {
      retourlog: data
    })
  } catch (error) {
    console.error(error)
  }
}

exports.envoilog = async (req, res, next) => {
  try {
    const message = req.body.message
    await exec(`dnf search ${message}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(`stderr: ${stderr}`)
      res.render(vuesdudossier + 'index.ejs', {
        retourlog: stdout.split(/\n/)
      })
    })
  } catch (error) {
    console.error(error)
  }
}
