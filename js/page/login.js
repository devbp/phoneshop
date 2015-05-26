
function alertdismissed()
{
console.log('hello');
 }
$(document ).ready(function() {
            $( ".login-btn" ).click(function() {
                if ($( "#username").val() && $( "#password").val())
                {     
                    loginCheck($("#username").val(),$( "#password").val());
                }
                else {
                    //console.log("Failed")
                    //alert('Invalid username or password');
                    navigator.notification.alert(
                    'Please enter username or password!',  // message
                      alertdismissed,         // callback
                       ' ',            // title
                        'Ok'                  // buttonName
);
                }
            });

    });



	function loginCheck (username, password) {        
    spinnerplugin.show();
    $.post('http://s250217848.online.de/api/public/index.php/login/gettoken', { email: username+"@something.com", password : password}, 
    function(returnedData){
         spinnerplugin.hide(); 
         console.log("Yes")
         //alert(JSON.stringify(returnedData))
         if (returnedData.statusCode == 200)
         {
            token = returnedData.token.token_key
            console.log(token)            
            localStorage.token = token;
            
            window.location="main.html?token="+token;
            nativetransitions.flip(0.8, 'down');
         }
         
          if (returnedData.statusCode != 200)
         {
                 navigator.notification.alert(
                    'Invalid username or password!',  // message
                      alertdismissed,         // callback
                       ' ',            // title
                        'Ok'                  // buttonName
                        );
           // alert("Try Again with valid username and password. There was a problem.")
         }
         
    });
   
}

	document.addEventListener("backbutton", onBackKeyDown, false);
	function onBackKeyDown() 
	{
		navigator.app.exitApp();
	}
