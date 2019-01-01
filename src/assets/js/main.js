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
  $(".foot").css({ "margin-top" : "800px"});
}
function bodyIndex(){
  $("body").css({"background":"#081016"});

}
function bodySignin(){
  $("body").css({"background-image":"url('assets/images/bg-signin-.jpg')","background-position": "center","background-size": "cover"});
  $(".foot").css({ "margin-top" : "800px"});
}
function bodyPages(){
  $("body").css({"background-color":" #d3d5d2 ","background-size": "cover", "background-position": "center"});
  $(".foot").css({ "position" : "position-relative"});
}
function moreInfo(){

  $(".more").click(function(){
    if($(".title p").text().length> 150){
      if($(".title").height()== 300){
        $(".title p").css({"text-overflow": "clip", "white-space":"normal", "overflow":"visible"})
        $(".title ").css({"height": "500px"})
        $(".dropbtn").css({"position": "absolute", "margin-top" : "-175px"})
        $(".heart").css({"position": "absolute", "margin-top" : "-144px"})
        $(".more").css({ "margin-top" : "70px"})
        $(".more").text("Less-")
      }else{
        $(".title p").css({"text-overflow": "ellipsis", "white-space":"nowrap", "overflow":"hidden"})
        $(".title ").css({"height": "300px"})
        $(".dropbtn").css({"position": "", "margin-top" : ""})
        $(".heart").css({"position": "", "margin-top" : ""})
        $(".more").css({ "margin-top" : "-20px"})
        $(".more").text("More+")
      }
    }
  });

}
