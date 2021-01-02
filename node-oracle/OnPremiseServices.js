const OnPremiseConnection = require("./OnPremiseExecute");
const model = require("./model");

class OnPremiseService {
    static sync(data) {
        return new Promise(async(resolve, reject) => {
            try {
                const { Message } = data;
                const response = await OnPremiseConnection.executeQuery("BEGIN ACSELX.UMC_TEST.INSERT_NUEVO(:cID); END;", new model(Message))
                console.log(response);
                const { metaData } = response;
                console.log("La metaData", metaData)
                resolve({ mensaje: "Execute correct!" })

            } catch (error) {
                console.error(`Error`, error);
                reject(error);
            }
        })
    }
}
let dataInput = {
    Message: {
        cID: 15
    }
}
const exec = OnPremiseService.sync(dataInput);

exec.then(res => console.log(res)).catch(err => console.log(err))