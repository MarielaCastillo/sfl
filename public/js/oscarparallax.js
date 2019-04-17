var finHeight;

const actualiza=()=>{
// console.log(document.querySelector('.background'))
const finImg=Number(document.querySelector('.sanddown').offsetHeight)
const margen=Number(getComputedStyle(document.querySelector('.sanddown')).getPropertyValue("margin-top").split("px")[0])
finHeight=finImg+margen
console.log(finImg)
console.log(margen)
console.log(finHeight)
// console.log(document.querySelector('.gimmesomespace').style.height)
const newHeight=(finHeight-80).toString()+"px";
console.log(`nueva altura ${newHeight}`)
document.querySelector('.gimmesomespace').style.height=newHeight
}

$(window).on('load',()=>{
 actualiza();
})


$( window ).resize(function() {
actualiza();
});

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
    if (scrollVar > finHeight-450) {
    $('.dissappear').css("display", "none");
    }
    else
    {
    $('.dissappear').css("display", "block");
    }
})
  

// let absoluteDivHeight = document.getElementByClassName('absoluteDiv')[0].offsetHeight;
// let blankDiv = document.getElementByClassName('blankDiv')[0];
// blankDiv.style.height = absoluteDivHeight + 5 + "px";

//===================================stuff from  navbar
   // Closes responsive menu when a scroll trigger link is clicked
   $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > finHeight-150) {
 // if ($("#mainNav").offset().top > 1050) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();

  
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

//   Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function(e) {
    $('.navbar').addClass('d-none');
  })

  $('.portfolio-modal').on('hidden.bs.modal', function(e) {
    $('.navbar').removeClass('d-none');
  })


