$(document).ready(function () {
   $("#login_btn").click(function () {

       var username=$("#username_input").val();
       var password=$("#password_input").val();
       var login_alert=$("#login_alert");
       var alert_text=$("#alert_text");
       login_alert.slideUp();
       if(username==""){
           alert_text.text("Username is required!");
           login_alert.slideDown();
           return;
       }
       if(password==""){
           alert_text.text("Password is required!");
           login_alert.slideDown();
           return;
       }
       $.ajax({
           type: "POST",
           url: "http://localhost:8080/login",
           data:{
               username:username,
               password:password
           },
           dataType: "json",
           success: function (data) {
               if(data==-1){
                   alert_text.text("Username not exists!");
               }else if(data==-2){
                   alert_text.text("Password not correct!");
               }
               login_alert.slideDown();
           },
           error: function (jqXHR, textStatus, errorThrown) {
               alert(jqXHR.statusText);
           }
       });
   }) ;
});