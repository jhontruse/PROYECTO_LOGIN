const sequelize = require('./mysql');
const dbConnectMySQL = async () => {
    try {
        await sequelize
            .sync({ force: false })
            .then(() => { console.log("*******CONEXION CORRECTA MYSQL*******"); })
            .catch((error) => {
                console.log("Se ha producido un error", error);
            });
    } catch (error) {
        console.log("🚀 ~ file: connection.js ~ line 13 ~ dbConnectMySQL ~ error", error);
    }
    /*const dbConnectMySql = async () => {
        try {
            await sequelize.authenticate({ force: true });
            console.log("MYSQL Conexión correcta");
        } catch (e) {
            console.log("MYSQL Error de Conexión", e);
        }
    };*/
};
module.exports = dbConnectMySQL;