const bcrypt = require('bcrypt')
const accountService = require('./accountService')

exports.showAccountLayout = (req, res) => {
    res.render('myAccount/accountLayout');
}

exports.changeAccountInfo = async (req, res) => {
    const id = req.body.userid;
    const bankingNum = req.body.bankingNum;
    const lastname = req.body.lastname;
    const firstname = req.body.firstName;
    const password = req.body.password;

    const us = await accountService.getUser(id);
    const match = await bcrypt.compare(password, us.PASS);
    if(!match){
        res.render('myAccount/accountLayout', {confirmWrong: true});
    }
    else {
        await accountService.updateInfo(id, firstname, lastname, bankingNum);
        res.render('myAccount/accountLayout', {confirmWrong: false});
    }
}