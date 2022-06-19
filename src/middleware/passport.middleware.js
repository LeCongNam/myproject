const passport = require('passport');

passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/auth/login'
})