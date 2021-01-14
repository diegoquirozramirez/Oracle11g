const oracledb = require('oracledb');
var util = require('util')
oracledb.autoCommit = true;
let connection;

class OracleDriver {

    static async getConnection(type = "TNS", user = "system", password = "oracle", host = "hostname", port = "1521", SID = "xe", database = "") {
        try {
            const conexion = util.promisify(oracledb.getConnection).bind(oracledb);
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

    static async executeQuery(properties, query, databinds) {
        try {
            //const { type, user, password, host, port, SID, database } = properties;
            //await this.getConnection(type, user, password, host, port, SID, database);
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

module.exports = OracleDriver;