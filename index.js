var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var users = []

var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json());


function userExists(username) {
    return users.some(function(el) {
      return el.user === username;
    }); 
  }

app.post('/login', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    const data = {
       user:req.body.user,
       password:req.body.password
    };

    if (!userExists(data.user)){
        res.end(JSON.stringify({message: "user does not exist!"}))
        return
    }
    const user = users.find(el => el.user === data.user)
    if (user.password !== data.password){
        res.end(JSON.stringify({message: "Inavlid credentials!"}))
        return;
    }
    
    res.end(JSON.stringify({message: "sucessfull login!"}));
 })

 app.post('/sign-up', urlencodedParser, function (req, res) {
    console.log(req.body)
    const data = {
        user:req.body.user,
        password:req.body.password
    };
    if (userExists(data.user)) {
        res.end(JSON.stringify({message: "user already exist!"}))
        return
    }
    console.log(users)
    users.push(data);
    res.end(JSON.stringify({message: "User succesfully register"}))

 })

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})