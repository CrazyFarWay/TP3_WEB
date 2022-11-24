const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: process.env.DB_HOST           ||'localhost', 
    user: process.env.DB_USER           ||'root', 
    password: process.env.DB_PASSWORD   ||'root',
    database: process.env.DB_DATABASE   ||'empleados',
    connectionLimit: 5,
});

module.exports=pool