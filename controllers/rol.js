const { matchedData } = require("express-validator");
const models = require("../models");

const getItems = async (req, res) => {
    try {
        await models.rolModel.findAll()
            .then(roles => {
                res.status(200).json({ roles });
            })
            .catch(error => {
                res.status(400).send(error);
            });
    } catch (e) {
        console.log('------------------------------------------------------');
        console.log('ERROR-getItems');
        console.log('------------------------------------------------------');
        console.log("🚀 ~ file: user.js ~ line 15 ~ getItems ~ e", e);
        res.status(400).send(e);
    }
};

const createItems = async (req, res) => {
    try {
        await models.rolModel.create(req.body)
            .then(rol => {
                res.status(200).json({ rol });
            })
            .catch(error => {
                res.status(400).send(error);
            });
    } catch (e) {
        console.log('------------------------------------------------------');
        console.log('ERROR-createItems');
        console.log('------------------------------------------------------');
        console.log("🚀 ~ file: user.js ~ line 35 ~ getItems ~ e", e);
        res.status(400).send(e);
    }
};

module.exports = { getItems, createItems };
