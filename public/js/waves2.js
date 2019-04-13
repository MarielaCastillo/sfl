

$(window).scroll(function(){
    var scrollVar = $(window).scrollTop();
    $('.fadein').css("opacity", 0.2 + scrollVar/300);
})

$(window).scroll(function(){
    var scrollVar = $(window).scrollTop();
    $('.fadein2').css("opacity", -0.9 + scrollVar/500);
})

$(window).scroll(function(){
    var scrollVar = $(window).scrollTop();
    $('.fadein3').css("opacity", 0.5 + scrollVar/300);
})

$(window).scroll(function(){
    var scrollVar = $(window).scrollTop();
    $('.fadeout').css("opacity", 2.1 - scrollVar/500);
})

