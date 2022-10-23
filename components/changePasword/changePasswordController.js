const bcrypt = require('bcrypt');
const changePasswordService = require('./changePasswordService');

exports.showchangePasswordLayout = (req, res) => {
    res.render('changePassword/changePasswordLayout');
}

exports.resetPassword = async (req, res) => {
    const id = req.body.userid;
    const currentpass = req.body.currentpass;
    const newpass = req.body.newpass;
    const confirmPassword = req.body.confirmpass;
    const user = await changePasswordService.getUserbyID(id);
    const match = await bcrypt.compare(currentpass, user.PASS);
    const matchNew = await bcrypt.compare(confirmPassword, user.PASS);

    if (!match) {
        res.render('changePassword/changePasswordLayout', {differentcurentPass: true});
    }
    else if (newpass !== confirmPassword) {
        res.render('changePassword/changePasswordLayout', {differentConfirm: true});
    }
    else if(matchNew){
        res.render('changePassword/changePasswordLayout', {sameOld: true});
    }
    else {
        try {
            const hashPass = await bcrypt.hash(confirmPassword, 10);
            await changePasswordService.changePassword(id, hashPass);
            res.render('changePassword/changePasswordLayout', {differentcurentPass: false, differentConfirm: false, sameOld: false, success: true});
        }
        catch (err){
            console.log('failed updated')
        }
    }
}