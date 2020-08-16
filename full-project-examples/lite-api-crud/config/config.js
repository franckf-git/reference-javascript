module.exports = {
    ENV: process.env.NODE_ENV || 'production',
    PORT: process.env.PORT || 3000,
    TOKEN_SECRET: 'qbvrjkj42545kqzervhj442wrgkfhws5f4ze',
    TOKEN_EXPIRATION: '1d',
    SQLITE_FICHIER: './production.sqlite'
}