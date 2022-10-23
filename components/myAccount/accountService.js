const bcrypt = require('bcrypt');
const {models} = require('../../models');
const {Sequelize} = require("sequelize");

exports.getUser = async (ID) => {
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

exports.updateInfo = async (ID, firstname, lastname, bankingNum) =>{
    await models.users.update({TEN: firstname, HO: lastname, SO_BANKING: bankingNum}, {where:{USER_ID: ID}});
}