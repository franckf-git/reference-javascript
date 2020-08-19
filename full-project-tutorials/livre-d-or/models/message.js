let db = require('../config/db')
let moment = require('../config/momentfr')

class Message {

  constructor(row) {
    this.row = row
  }

  get id() {
    return this.row.id
  }

  get content() {
    return this.row.content
  }

  get created_at() {
    return moment(this.row.created_at)
  }

  static create(content, cb) {
    db.run('INSERT INTO messages (content, created_at) VALUES (?, ?)', [content, new Date()], (err, result) => {
      if (err) throw err
      cb(result)
    })

  }

  static all(cb) {
    db.all('SELECT * FROM messages', (err, rows) => {
      if (err) throw err
      cb(rows.map((row) => new Message(row)))
    })
  }

  static find(id, cb) {
    db.all('SELECT * FROM messages WHERE id = ?', [id], (err, rows) => {
      if (err) throw err
      cb(new Message(rows))
    })
  }
}

module.exports = Message