

$(window).scroll(function(){
    var scrollVar = $(window).scrollTop();
    if (scrollVar < 700) {
    $('.fadein').css("opacity", 0.2 + scrollVar/300);
    }
    else
    $('.fadein').css("opacity", 0);
})

$(window).scroll(function(){
    var scrollVar = $(window).scrollTop();
    $('.fadein2').css("opacity", -0.9 + scrollVar/500);
})

$(window).scroll(function(){
    var scrollVar = $(window).scrollTop();
    if (scrollVar < 400) {
    $('.fadein3').css("opacity", 0.5 + scrollVar/300);
    }
})

$(window).scroll(function(){
    var scrollVar = $(window).scrollTop();
    $('.fadeout').css("opacity", 2.1 - scrollVar/500);
})

$(window).scroll(function(){
    var scrollVar = $(window).scrollTop();
    if (scrollVar > 700) {
    $('.dissappear').css("display", "none");
    }
    else
    {
    $('.dissappear').css("display", "block");
    }
})


