require('dotenv').config()

module.exports = {
    PORT,
    DB_URL,
    JWT_SECRET_KEY,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_FROM,
} = process.env