

function getUserData() {
	FB.api('/me',{fields: "name,picture"}, function(response) {
		console.log(response);
		setUserName(response.name+","+response.picture.data.url);
		window.location.href="http://localhost:8080/FindPlaces/Googlemapapi.html";
	});
}
 
window.fbAsyncInit = function() {
	//SDK loaded, initialize it
	FB.init({
		appId      : '102918620106402',
		xfbml      : true,
		version    : 'v2.2'
	});
 
	//check user session and refresh it
	/*FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			//user is authorized
			//document.getElementById('loginBtn').style.display = 'none';
			getUserData();
		} else {
			//user is not authorized
		}
	});*/
};
 
//load the JavaScript SDK
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
 
//add event listener to login button
var fblogin=function(){
	//do the login
	
	console.log("entered login");
	
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			//user is authorized
			//document.getElementById('loginBtn').style.display = 'none';
			getUserData();
		} else {
			//user is not authorized
		}
	});
};

function fblogout(){
	
	 /* FB.logout(function(response) {
		  console.log("Person logged out successfully");
		});
		  
		  console.log("fb logged out");	*/
		  FB.getLoginStatus(function(response) {
	          if (response.status === 'connected') {
	        	  
	        	  
	        	  
	              FB.logout(function(response) {
	            	  
	            	  console.log("successfully logged out from fb");
	            	  window.location.href="http://localhost:8080/FindPlaces/index.html";
	              });
	          }
	      });
		  
		  }





























/*
// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
    		getUserData();
    		window.location.href="http://localhost:8080/FindPlaces/Googlemapapi.html";
    	 
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
    	document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    	
    	console.log("FB auth failed, not_authorized");
    	
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    	
    	console.log("FB auth failed, not logged into fb");
    	
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  (function(d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) return;
	    js = d.createElement(s); js.id = id;
	    js.src = "//connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));
  
  function checkLoginState() {	  
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  
  function fblogout(){
  FB.logout(function(response) {
	  console.log("Person logged out successfully");
	});
	  
	  console.log("fb logged out");	
	  FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
        	  
        	  
        	  
              FB.logout(function(response) {
            	  
            	  console.log("successfully logged out from fb");
            	  window.location.href="http://localhost:8080/FindPlaces/index.html";
              });
          }
      });
	  
	  }
  
  
  window.fbAsyncInit = function() {
  FB.init({
    appId      : '102918620106402',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
  
  

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function getUserData() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me',{fields: "name,picture"}, function(response) {
    	console.log(response);
      console.log('Successful login for: ' + response.name);
      setUserName(response.name+","+response.picture.data.url);
    });
  }*/