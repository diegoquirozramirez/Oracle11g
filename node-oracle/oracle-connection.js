const oracledb = require('oracledb');
var util = require('util')
oracledb.autoCommit = true;
let connection;

class OracleDriver {

    static async getConnection(type, user, password, host, port, SID, database) {
        try {
            const conexion = util.promisify(oracledb.getConnection).bind(oracledb);
            console.info("CREATING POOL CONNECTION ... ")
            if (type == "TNS") {
                connection = await conexion({
                    user: `${user}`,
                    password: `${password}`,
                    connectString: `(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = ${host})(PORT = ${port}))(CONNECT_DATA =(SID= ${SID})))`
                });
            } else {
                connection = await conexion({
                    user: `${user}`,
                    password: `${password}`,
                    connectString: `${host}/${port}/${database}`
                });
            }
        } catch (error) {
            return error;
        }
    }

    static async executeQuery(query, databinds) {
        try {
            console.info("EXECUTING QUERY .... ")
            const executeResult = await connection.execute(query, databinds, {}); // [] por cada campo .. ejem [2, 'name','pepito', ...]
            await this.closeConnection();
            return executeResult;
        } catch (error) {
            return error;
        }
    }

    static async closeConnection() {
        try {
            const close = await connection.release();
            console.info("DATABASE RELEASED .... ")
            return close;
        } catch (error) {
            return error;
        }
    }
}

module.exports = OracleDriver;