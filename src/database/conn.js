const mysql = require('mysql2')
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_SCHEMA } = require('./config');

const connection = mysql.createConnection({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_SCHEMA
});

async function conn() {
    try {
        await connection.connect();
        console.log('Banco no ar')
    } catch (error) {
        console.log('Error', error)
    }
}

module.exports = conn;