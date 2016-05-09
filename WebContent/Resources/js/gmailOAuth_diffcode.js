	function renderButton() {
	
      gapi.signin2.render('my-signin2', {
        'scope': 'profile',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
      
    }

	function onSuccess(googleUser) {

      profile= googleUser.getBasicProfile();
      
      userName=profile.getName();
      userImage=profile.getImageUrl();
      
      	/*console.log("ID: " + profile.getId()); 
        console.log("Name: " + profile.getName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());*/
      
      setUserName(userName+","+userImage);
      window.location.href = "http://localhost:8080/FindPlaces/Googlemapapi.html";
			
			
    }
    
    function onFailure(error) {
    
      console.log(error);
      
    }

	function signOut() {
	
    	var auth2 = gapi.auth2.getAuthInstance();
   		 auth2.signOut().then(function () {
      console.log('User signed out.');
   	 });
   	 
  }
