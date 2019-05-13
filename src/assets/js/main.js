function bodyIndex(){
  $("body").css({"background":"#081016"});
}
function bodyPages(){
  $("body").css({"background-color":" #d3d5d2 ","background-size": "cover", "background-position": "center"});
  $(".foot").css({ "position" : "position-relative"});
  $("body").fadeIn("slow");
}
function favoritos(){
  $(".heart").click(function(){
      if($(this).attr("style") == "background-color: red;"){
        $(this).css({"background-color":" #ff00b6"});
        $(this).mouseenter(function(){
            $(this).css({"background-color":"#7f8fad"});
        });
        $(this).mouseout(function(){
            $(this).css({"background-color":"#ff00b6"});
        });
      }else{
        $(this).css({"background-color":"red"});
        $(this).mouseout(function(){
            $(this).css({"background-color":"red"});
        });
        $(this).mouseenter(function(){
            $(this).css({"background-color":"red"});
        });
      }
  });
}
