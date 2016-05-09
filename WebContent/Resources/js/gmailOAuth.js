function logout()
{
	console.log("Logging out through gmail");
	
    gapi.auth.signOut();
    window.location.href = "http://localhost:8080/FindPlaces/index.html";
}
function login() 
{
  var myParams = {
    'clientid' : '162290943694-2ccl4argh327amkr69df549lr66ueg0d.apps.googleusercontent.com',
    'cookiepolicy' : 'single_host_origin',
    'callback' : 'loginCallback',
    'approvalprompt':'force',
    'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
  };
  gapi.auth.signIn(myParams);
  
}
 
function loginCallback(result)
{
	
	
    if(result['status']['signed_in'])
    {
        var request = gapi.client.plus.people.get(
        {
            'userId': 'me'
        });
        request.execute(function (resp)
        {
            var email = '';
            if(resp['emails'])
            {
                for(i = 0; i < resp['emails'].length; i++)
                {
                    if(resp['emails'][i]['type'] == 'account')
                    {
                        email = resp['emails'][i]['value'];
                    }
                }
            }

            var userName =resp['displayName'];
			var userImage=resp['image']['url'];
			var userEmail=email;
			
			setUserName(userName+","+userImage);
			
			window.location.href = "http://localhost:8080/FindPlaces/Googlemapapi.html";
			
			
			
			/*$('#userIcon').hide();
			$('#loginBtn').hide();
			$('#logoutBtn').attr('style','display:block');*/
			$('#userImage').attr('src',userImage);
			


        });
 
    }
 
}
function onLoadCallback()
{
    gapi.client.setApiKey('AIzaSyAfbgXDJhF6mVQhxMIEgxx_dB0mnXaXkL4');
    gapi.client.load('plus', 'v1',function(){});
}
 