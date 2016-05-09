var logIn=function(loginType){
	
	//console.log("Login Type : "+loginType);
	
	if(loginType==="Website login"){
		//console.log("Logged Through Normal website login");
		
		angular.injector(['ng', 'findPlacesApp']).invoke(function (srvShareData) {
			srvShareData.addLoginTypeData("Website login");
			});
		
		//Calling Angularjs Function form js funcation
		 var scope = angular.element(document.getElementById("findPlacesAppId")).scope();
		    scope.$apply(function () {
		    	scope.websiteLogin();
		    });
		    
		//$scope.websiteLogin();
	}
	else if(loginType==="google"){
		//console.log("Logged Through Google");
		
		//Calling Angularjs Service form js funcation
		angular.injector(['ng', 'findPlacesApp']).invoke(function (srvShareData) {
			srvShareData.addLoginTypeData("google");
			login() ;
			});
		 
		
	}
	else if(loginType==="facebook"){
		//console.log("Logged Through Facebook");
		
		//Calling Angularjs Service form js funcation
		angular.injector(['ng', 'findPlacesApp']).invoke(function (srvShareData) {
			srvShareData.addLoginTypeData("facebook");
			});
		
		//checkLoginState();
		
		fblogin();
		
	}
	
	/*console.log("name : "+$scope.email);
	console.log("email : "+$scope.password);*/
	
};


var app=angular.module('findPlacesApp',[]);

app.service('srvShareData', function($window,$rootScope) {

	var KEY = 'App.SelectedValue';
	var key1="newKey";

	var addData = function(newObj) {
		
		
		mydata = [];
		mydata=newObj;
		$window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
	};

	var getData = function(){
		var mydata = $window.sessionStorage.getItem(KEY);
		if (mydata) {
			mydata = JSON.parse(mydata);
		}
		return mydata || [];
	};

	var addLoginTypeData = function(newObj) {
		
		
		mydata = [];
		mydata=newObj;
		$window.sessionStorage.setItem(key1, JSON.stringify(mydata));
	};

	var getLoginTypeData = function(){
		var mydata = $window.sessionStorage.getItem(key1);
		if (mydata) {
			mydata = JSON.parse(mydata);
		}
		return mydata || [];
	};
	
	/*var updateNameImage=function(){
		
		var userData=getData();
		//console.log(data);
		splitData=userData.split(",");
		
		name=splitData[0];
		
		if(splitData[1]!=""){
			userImage=splitData[1];
			console.log("image : "+splitData[1]);
		}
		
		console.log("name : "+splitData[0]);
		
		
	};*/
	
	return {
		
		addData: addData,
		getData: getData,
		addLoginTypeData : addLoginTypeData,
		getLoginTypeData : getLoginTypeData,
		//updateNameImage : updateNameImage
	};

});

app.controller('googleMapController',function($scope,$window,srvShareData){


	/*
		 console.log(srvShareData.getData());
	
		
		$scope.data=srvShareData.getData();
		splitData=$scope.data.split(",");
		
		$scope.name=splitData[0];
		
		if(splitData[1]!=""){
			$scope.userImage=splitData[1];
			console.log("image : "+splitData[1]);
		}
		
		//console.log("name : "+splitData[0]);
		 
	// },5000);  
*/	 
	$scope.getUserName=function(){
		
		var userData=srvShareData.getData();
		
		if(userData!=""){
			var data=userData.split(",");
		
			if(data[0]!=""){
				return data[0];
			}
			else{
				return "user";
			}
		}
	};
	
	$scope.getUserImage=function(){
		
		var userData=srvShareData.getData();
		
		if(userData!=""){
			var data=userData.split(",");
		
			if(data[1]!=""){
				return data[1];
			}
			else{
				return "";
			}
		}
		
	};
	
	//console.log("entered ");
	
	
	/*Initialise the session variables*/
	
	 
	 
	//console.log("Logged through : "+srvShareData.getLoginTypeData());
	
	//$scope.updateNameImage=function(){
		
		/*console.log("called");
		
		$scope.data=srvShareData.getData();
		splitData=$scope.data.split(",");
		
		$scope.name=splitData[0];
		
		if(splitData[1]!=""){
			$scope.userImage=splitData[1];
			console.log("image : "+splitData[1]);
		}
		
		console.log("name : "+splitData[0]);*/
	//};
	
	

	
	$scope.logout=function(){
		console.log("Logged through : "+srvShareData.getLoginTypeData());
		//console.log("Logout called");
		
		if(srvShareData.getLoginTypeData()==="Website login"){
			console.log("Website login : exit");
			srvShareData.addData("");
			$window.location.href = 'http://localhost:8080/FindPlaces/index.html';
		}
		else if(srvShareData.getLoginTypeData()==="google"){
			srvShareData.addData("");
			console.log("google : exit");
			logout();
		}
		else{
			srvShareData.addData("");
			console.log("fb : exit");
			fblogout();
		}
		
		 //$window.location.href = 'http://localhost:8080/FindPlaces/index.html';
	};
	
});

app.controller('findPlacesAppController',function($http,$scope,$window,srvShareData){
	
	srvShareData.addData("");
	
	$scope.websiteLogin=function(){
		
		var params = JSON.stringify({email: $scope.email,password:$scope.password });
		 var url = "http://localhost:3000/authenticate?callback=JSON_CALLBACK&email="+$scope.email+"&password="+$scope.password;

		    $http.jsonp(url).then(function(response) {
		    	
		    	srvShareData.addData($scope.email+",");
		    	
		    	//console.log(response);
		    	
		    	 if(response.data){
		    	    $window.location.href = 'http://localhost:8080/FindPlaces/Googlemapapi.html';
		    		console.log("valid User");
		    	 }
		    	  else{
		    		  $scope.message="Invalid User , Please Try Again";
		    		  console.log("Invalid User");
		    	  }
	    })
		    .catch(function(response) {
		      console.error('Gists error', response.status, response.data);
		    });
		    
	};
	
	
});



/* Google Login OAuth Starts*/

function setUserName(name){
	//console.log("before : "+name);
	angular.injector(['ng', 'findPlacesApp']).invoke(function (srvShareData) {
	   srvShareData.addData(name);
  //console.log("after : "+srvShareData.getData());
	});
	
}

/*angular.injector(['ng', 'findPlacesApp']).invoke(function (srvShareData) {
    alert(srvShareData.addData(name));
});*/
/* Google Login OAuth Ends*/