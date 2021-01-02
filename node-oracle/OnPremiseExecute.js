const oracledb = require('oracledb');
var util = require('util')
oracledb.autoCommit = true;
let connection;

class oracleOnpremise {

    static async getConnection() {
        try {
            const conexion = util.promisify(oracledb.getConnection).bind(oracledb);
            connection = await conexion({
                user: "system",
                password: "oracle",
                connectString: "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 49161))(CONNECT_DATA =(SID= xe)))"
            });
        } catch (error) {
            return error;
        }
    }

    static async executeQuery(query, databinds) {
        try {
            await this.getConnection();
            const executeResult = await connection.execute(query, databinds); // [] por cada campo .. ejem [2, 'name','pepito', ...]
            await this.closeConnection();
            return executeResult;
        } catch (error) {
            return error;
        }
    }

    static async closeConnection() {
        try {
            const close = await connection.release();
            return close;
        } catch (error) {
            return error;
        }
    }
}

module.exports = oracleOnpremise;