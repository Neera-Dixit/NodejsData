var express=require('express');
var expressApp=express();
var bodyParser = require('body-parser');
//var User=require('./nodeMongoConnect');

//expressApp.use(bodyParser.urlencoded({ extended: false }));

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
expressApp.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + port )
});

/*expressApp.get('/authenticate',function(request,response){
    console.log(request.query.email);
    console.log(request.query.password);
   
   // alert("");

    userEmail=request.query.email
    userPassword=request.query.password;
    

    var userData = new User({
         email : userEmail,
         password : userPassword
          
    });*/

    /*// To Save data in to collection
    userData.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully!');
    });*/

    // To retrive all the data from the collection
    
   /* User.find({ "email" : userEmail,"password" : userPassword }, function(err, authStatus) {
    	  if (err) throw err;

    	  console.log(authStatus);
    	  
    	  //response.setHeader('Content-Type', 'application/json');
    	  //response.jsonp(authStatus);
    	    
    	  	if(authStatus[0]==null)
    	  		response.jsonp(false);
    	  	else
    	  		response.jsonp(true);
    	  		
    	});*/


});

//expressApp.listen(8080);

