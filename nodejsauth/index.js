//load dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

//load and initialize message bird SDK
var messagebird = require('messagebird')('test_gshuPaZoeEG6ovbc8M79w0QyM');
// setup Express framework
var app=express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');
app.use(bodyParser.urlencoded({extended: true}));
//display page to ask user for phone number
app.get("/", function (req, res){
    res.render('step1');
});

//handle phone number submission
app.post('/step2', function (req,res){
   var number = req.body.number;

   //verify
    messagebird.verify.create(number, {
        template : "Your verification code is %token."
    }, function (err, response){
        if (err){
            //failed request
            console.log(err);
            res.render('step1', {
                error: err.errors[0].description,
            });
        }else {
            //successful request
            console.log(response);
            res.render('step2' ,{
                id : response.id
            });
        }
    });
});
//token verification
app.post('/step3', function(req,res){
    var id = req.body.id;
    var token = req.body.token;
    //make request to api
    messagebird.verify.verify(id,token,function (err,response){
        if(err){
            res.render('step2', {
                error : err.errors[0].description,
                id : id
            });
        }
        else{
            res.render('step3');
        }
    });
});
app.listen(8080);


