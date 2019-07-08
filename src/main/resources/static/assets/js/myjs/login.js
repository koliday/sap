$(document).ready(function () {
   $("#login_btn").click(function () {

       var username=$("#username_input").val();
       var password=$("#password_input").val();
       var login_alert=$("#login_alert");
       var alert_text=$("#alert_text");
       login_alert.hide();
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
               if(data==1){
                   window.location.href="/clientoverview";
                   return;
               }else if(data==-1){
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
   $("#goto_register_btn").click(function () {
      $("#login_content").hide();
      $("#register_content").show();
      $("#ifreg_content").hide();
   });
   $("#goto_forget_password_btn").click(function () {
       $("#login_content").hide();
      $("#forget_password_content").show();
   });
    $("#register_btn").click(function () {

        var username=$("#reg_username_input").val();
        var password=$("#reg_password_input").val();
        var repassword=$("#reg_repassword_input").val();
        var eno=$("#reg_eno_input").val();

        var reg_alert=$("#reg_alert");
        var reg_text=$("#reg_text");
        reg_alert.hide();
        //用户名及密码验证
        if(username=="" || username.length>20){
            reg_text.text("Invalid Username!");
            reg_alert.slideDown();
            return;
        }
        if(password=="" || password.length>32 || password.length<6){
            reg_text.text("Invalid Password!");
            reg_alert.slideDown();
            return;
        }
        if(repassword!=password){
            reg_text.text("Wrong Repassword!");
            reg_alert.slideDown();
            return;
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/register",
            data:{
                username:username,
                password:password,
                eno:eno
            },
            dataType: "json",
            success: function (data) {
                if(data==1){
                    window.location.href="/index";
                }else if(data==-1){
                    reg_text.text("Employee No. not exists!");
                }else if(data==-2){
                    reg_text.text("Employee No. has been registered as a user!");
                }else if(data==-3){
                    reg_text.text("Username exists!");
                }else if(data==-4){
                    reg_text.text("Register failed!");
                }
                reg_alert.slideDown();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });
    }) ;

    $("#back_btn").click(function () {
        $("#login_content").show();
        $("#register_content").hide();
        $("#ifreg_content").show();
    });
});