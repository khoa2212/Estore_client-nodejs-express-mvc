const passport = require('passport')
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const {models} = require('../models');
const users = models.users;

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
    async function(username, password, done) {
        try {
            const user = await users.findOne({raw:true, where: {EMAIL: username, LA_ADMIN: false}});
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const match = await validPassword(user, password);
            if (!match) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    })
);

function validPassword(user, password) {
    return bcrypt.compare(password, user.PASS);
}

passport.serializeUser(function(user, done) {
    done(null, {userId: user.USER_ID, fullname: (user.TEN + ' ' + user.HO).toString(), firstName: user.TEN, lastName: user.HO, bankingNum: user.SO_BANKING, Email: user.EMAIL});
});

passport.deserializeUser(async function(user, done) {
    return done(null, user);
});

/*passport.deserializeUser(async function(id, done) {
    try {
        const user = await users.findOne({raw:true, where: {USER_ID: id}});
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
});*/


module.exports = passport;
