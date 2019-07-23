$(document).ready(function () {
    var path=window.location.pathname;
    $("li a").each(function () {

        if($(this).attr("href")==path+""){

            $(this).parent().addClass("kt-menu__item--active");
            $(this).parents("li").addClass("kt-menu__item--open");
        }
    })

    $("#logout").click(function () {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/logout",
            data:{

            },
            dataType: "json",
            success: function (data) {
                if(data==1){
                    window.location.href="/";
                }else{
                   alert("Logout Error");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.statusText);
            }
        });
    });
});