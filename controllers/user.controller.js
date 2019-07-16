var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req,res){
    res.render("users/index",{
        users: db.get('users').value()
    });
};
module.exports.search = function(req,res){
    var q = req.query.q; //query dung cho tim kiem q=th
    var userItem = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("users/index",{
        users : userItem
    });
};
module.exports.create = function(req,res){
    console.log(req.cookies);
    res.render("users/create");
};
module.exports.get = function(req,res){
    var id = req.params.id; //da remove parseInt(); 
    //params su dung khi can lay id
    var user = db.get('users').find({id : id}).value();
    res.render('users/view',{
        user : user 
    });
};
module.exports.postCreate = function(req,res){
    req.body.id = shortid.generate();
    console.log(res.locals);
    db.get('users').push(req.body).write();
    res.redirect('/users'); //chuyen nguoi dung ve trang users ko o trang create nua 
};