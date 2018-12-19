function scroll(){
$(window).on('scroll', function() {
        if ($(window).scrollTop()) {
            $('nav').addClass('black');
        } else {
            $('nav').removeClass('black');
        }

    });
  }
function bodyLogin(){
  $("body").css({"background-image":"url('assets/images/bg-login-5cent.jpg')","background-size": "cover"});
  $(".foot").css({ "margin-top" : "900px"});
}
function bodyIndex(){
  $("body").css({"background":"#081016"});

}

function bodySignin(){
  $("body").css({"background-image":"url('assets/images/bg-signin-ows.jpg')","background-size": "cover"});
  $(".foot").css({ "margin-top" : "900px"});
}
function bodyWhite(){
  $("body").css({"background-color":"#fffdfd ","background-size": "cover"});
  $(".foot").css({ "margin-top" : "900px"});
}
