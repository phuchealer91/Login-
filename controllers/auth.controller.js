var db = require('../db');
var cookieParser = require('cookie-parser');

module.exports.login = function(req,res){
    res.render("auth/login",{
        users: db.get('users').value()
    });
};

module.exports.postLogin = function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({email : email}).value();
    if(!user){
        res.render("auth/login",{
            errors : [
                'User does not exist .'
            ]
        });
        return;
    }
    if(user.password !== password){
        res.render("auth/login",{
            errors : [
                'Wrong password.'
            ]
        });
        return;
    }
    res.cookie('userId', user.id);
    res.redirect('/users');
};