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
  $(".foot").css({"position": "absolute"});
}
function bodyIndex(){
  $("body").css({"background":"#081016"});
  $(".foot").css({"position": "relative"});
}
