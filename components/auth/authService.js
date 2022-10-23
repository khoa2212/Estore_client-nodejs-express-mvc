const bcrypt = require('bcrypt');
const {models} = require('../../models');
const {Sequelize} = require("sequelize");
const Users = models.users;

exports.Register = async (firstName, lastName, email, bankingNum, password) => {
    //check if email is registed
    console.log('enter service')
    const Account = await models.users.findOne({where: {EMAIL: email, LA_ADMIN: 'USER'}});
    if(Account) {
        console.log('catch error');
        throw new Error('Email is already registed');
    }
    const hashPass = await bcrypt.hash(password, 10);
    console.log('finish hash')
    const countRows = await models.users.count() + 1;
    let NewID = "US";
    if(countRows > 99) {
        NewID = NewID + countRows.toString();
    }
    else if (countRows > 9){
        NewID = NewID + "0" + countRows.toString();
    }
    else {
        NewID = NewID + "00" + countRows.toString();
    }
    //create new account
    return Users.create({USER_ID: NewID, TEN: firstName, HO: lastName, EMAIL: email, SO_BANKING: bankingNum, PASS: hashPass, LA_ADMIN: false});
};
