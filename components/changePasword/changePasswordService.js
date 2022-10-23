const bcrypt = require('bcrypt');
const {models} = require('../../models');
const {Sequelize} = require("sequelize");

exports.getUserbyID = async (ID) => {
    return models.users.findOne({
        attributes: ['USER_ID', 'TEN', 'HO', 'EMAIL', 'SO_BANKING', 'PASS'],
        where: [{
            [Sequelize.Op.or]: [
                { USER_ID: ID }
            ]
        }],
        raw: true
    });
};

exports.changePassword = async (ID, password)=>{
    await models.users.update({PASS: password}, {where:{USER_ID: ID}});
};