const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const userSevice = require('../models/service/userService');
const configAuth = require('./authgoogle');
const User = require('../models/mongoose/userModel');
const regulationsService = require('../models/service/regulationsService');

passport.use(new LocalStrategy(
    async function (username, password, done) {
        const user = await userSevice.checkUser(username, password);
        if (!user) {
            return done(null, false, { message: 'Tên đăng nhập hoặc mật khẩu nhập sai!!!!' });
        }
        if (user.accountState === 1) {
            //Ap dung quy dinh ve thoi gian khoa tai khoan
            const listParameters = await regulationsService.getListParameters();

            for (let i = 0; i < listParameters.length; i++) {
                if (listParameters[i].id === "60c4dbc38883d632fcc11a07") {
                    if (listParameters[i].state) {
                        if (!(await userService.checkUnlockDate(user._id, user.lockDate))) {
                            return done(null, false, { message: 'Tài khoản bạn đã bị khóa!' });
                        } else return done(null, user);
                    } else {
                        return done(null, false, { message: 'Tài khoản bạn đã bị khóa!' });
                    }
                }
            }
        }

        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    userSevice.getUser(id).then((user) => {
        done(null, user);
    })
});

// auth google
passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
},
    function (token, refreshToken, profile, done) {
        process.nextTick(async function () {
            // // tìm trong db xem có user nào đã sử dụng google id này chưa
            //User.findOne({ 'google.id': profile.id }, function (err, user) {
            // if (err)
            //     return done(err);
            // if (user) {
            //     // if a user is found, log them in
            //     return done(null, user);
            // } else {
            // if the user isnt in our database, create a new user

            // User dang nhap bang google
            const user = await User.findOne({ email: profile.emails[0].value });

            
            if (user) {
               
                if(user.id)
                {
                    if (user.accountState === 1) {
                        //Ap dung quy dinh ve thoi gian khoa tai khoan
                        const listParameters = await regulationsService.getListParameters();

                        for (let i = 0; i < listParameters.length; i++) {
                            if (listParameters[i].id === "60c4dbc38883d632fcc11a07") {
                                if (listParameters[i].state) {
                                    if (!(await userService.checkUnlockDate(user._id, user.lockDate))) {
                                        return done(null, false, { message: 'Tài khoản bạn đã bị khóa!' });
                                    } else return done(null, user);
                                } else {
                                    return done(null, false, { message: 'Tài khoản bạn đã bị khóa!' });
                                }
                            }
                        }
                    }
                    return done(null, user);
                }
                else
                {
                    return done(null, false, { message: 'Email đã được sử dụng!!!' });
                }
            }
            else {
                console.log(profile.id);
                const newPostData =
                {
                    id: profile.id,
                    token: token,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png',
                    role: Object("5fe9b7b8ea0d1f18102eed2f")
                };
                var newUser = new User(newPostData);
                // set all of the relevant information
                // pull the first email
                // save the user
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
                //}
                //});
            }
        });
    }));

module.exports = passport;
