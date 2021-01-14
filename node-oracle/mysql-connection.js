const mysql = require('mysql');
const util = require('util')
let conexion;

class MysqlDriver {
    static async getConnection(user, password, host, port, database) {
        conexion = mysql.createConnection({
            host: `${host}`,
            user: `${user}`,
            password: `${password}`,
            port: `${port}`,
            database: `${database}`
        });
    }

    static async executeQuery(queryDB) {
        try {
            const query = util.promisify(conexion.query).bind(conexion)
            const result = await query(`${queryDB}`);
            console.log("resultado query", result)
            return result;
        } catch (error) {
            console.log("resultado query", error)
            return error;
        }
    }

    static async closeConnection() {
        try {
            const close = util.promisify(conexion.end).bind(conexion);
            await close();
            console.log("El resultado de correcto cerrado ");
            return close;
        } catch (error) {
            console.log("Result of close DB", error);
            return error;
        }
    }
}

module.exports = MysqlDriver