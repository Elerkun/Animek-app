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
  $("body").css({"background-image":"url('assets/images/bg-login-5cent.jpg')","background-position": "center","background-size": "cover"});
  $(".foot").css({ "margin-top" : "700px"});
}
function bodyIndex(){
  $("body").css({"background":"#081016"});

}
function bodySignin(){
  $("body").css({"background-image":"url('assets/images/bg-signin-.jpg')","background-position": "center","background-size": "cover"});
  $(".foot").css({ "margin-top" : "700px"});
}
function bodyPages(){
  $("body").css({"background-color":" #d3d5d2 ","background-size": "cover", "background-position": "center"});
  $(".foot").css({ "position" : "relative"});
}
