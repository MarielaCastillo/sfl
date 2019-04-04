function activame(){
    const boton2=`<i class="fas fa-times" style="color:white"></i>`
    console.log("me diste click")
    let elemento=document.querySelector(".opciones");
    console.log(document.querySelector(".opciones"))
    let icono=document.querySelector("#icono");
    console.log(icono.children[0])
    // icono.children[0]=`<i class="fas fa-times"></i>`
    console.log( icono.children[0])
    if(icono.innerHTML===boton2){
        console.log("abierto")
        // elemento.style="display:none"
        icono.children[0].remove()
        icono.innerHTML=`<i class="fas fa-bars" style="color:white"></i>`

    }
    else{
        // if(!elemento.classList.contains('increase'))
        // {
        //     elemento.classList.add('increase');
        // }
        console.log("cerrado")
        elemento.style="display:flex;z-index: 30;position:absolute"
        icono.children[0].remove()
        icono.innerHTML=boton2
    }
    console.log(elemento.classList)
    document.querySelector('.opciones').classList.toggle('collapsed');

}

function cambioPagina(elemento){
    console.log(elemento)
    console.log(elemento.getAttribute("data-destino"))
    window.location.href=elemento.getAttribute("data-destino")
}

function init_carousel (){
    console.log("iniciando carrusel")
    // new Glide('.glide').mount()
    var glide = new Glide('.glide', {
        startAt: 0,
        perView: 1,
        autoplay: 3000,
      })
      glide.mount()
      
}
init_carousel();