const passport = require('../../auth/passport');
const authService = require('./authService');

exports.showAuthLayout = (req, res) => {
    res.render('auth/authLayout', {wrongPassword: req.query.wrongPassword !== undefined});
}

exports.showRegisterLayout = (req, res) => {
    res.render('auth/register');
}

exports.signIn = (req, res) => {
    console.log('Login Successfully');
    if(req.user){
        res.redirect('/');
    }
    else{
        res.redirect('/auth');
    }
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

exports.Register = async (req, res) => {
    const {firstName, lastName, email, bankingNum, password} = req.body;
    try {
        if(!firstName || !lastName || !email || !bankingNum || !password) {
            res.render('auth/register', {errorCode: 1});
        } else {
            console.log('chay vo await service')
            await authService.Register(firstName, lastName, email, bankingNum, password);
            //login as registed user
            res.redirect('/auth');
        }
    } catch (error){
        //duplicate user
        res.render('auth/register', {errorCode: 2});
    }
}
