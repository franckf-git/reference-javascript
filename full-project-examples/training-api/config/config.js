module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 1337,
    PG_USER: 'pguser',
    PG_PASS: 'usermdp',
    PG_DATABASE: 'playgroundapi',
    TOKEN_SECRET: 'hrtd544hdsdg4548srgs',
    TOKEN_EXPIRATION: '300d',
    SQLITE_FICHIER: './development.sqlite'
}