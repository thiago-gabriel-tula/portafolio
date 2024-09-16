// Sacar el icono del aside

const icono = document.querySelectorAll('.menu__icon');
const ancho = window.innerWidth;
const alto = window.innerHeight;

document.addEventListener('DOMContentLoaded', ()=>{
    if(ancho < 1000){
        icono.forEach((i)=>{
            i.style.display = 'none';
        })
    }
});


// convertir el boton hamburguesa y X y hacer que aparezca o desaparezca el aside
const contenedor = document.querySelector('.layout__menu-toggle');
const barraLateral = document.querySelector('.layaut__aside');

contenedor.addEventListener('click', ()=>{
    const iconoBarra = contenedor.firstElementChild;
    
    if(iconoBarra.classList.contains('fa-bars')){

        barraLateral.style.display = 'block';

        iconoBarra.classList.remove('fa-bars');
        iconoBarra.classList.add('fa-xmark');

    }else{
        barraLateral.style.display = 'none';


        iconoBarra.classList.remove('fa-xmark');
        iconoBarra.classList.add('fa-bars');

        
    }
})


// Funcion para ver mas grande a la imagen
const imagen = document.querySelector('.user-info__container-image');

imagen.addEventListener('click', ()=>{

    if(ancho > 1190){
        // generar html
        const divCompleto = document.createElement('div');
        divCompleto.classList.add('contenedor-pantalla');


        divCompleto.innerHTML = `
        <div class="contenedor-pantalla__div">
            <i class="fa-solid fa-x contenedor-pantalla__icon"></i>
        </div>
        <div class="caja-padre">
            <div class="contenedor-pantalla__content">
                <img src="/js/img5.jpg" class="contenedor-pantalla__img">
            </div>
            <a href="/admin/proyectos" class="text-center text-4xl">
                <i class="fa-solid fa-lock bg-white px-3 py-2 color cursor-pointer rounded-lg"></i>
            </a>
        </div>
        `;

        document.querySelector('body').appendChild(divCompleto);

        const equis = document.querySelector('.fa-x');
        
        equis.addEventListener('click', salirPantalla);
        

    } else{
        const iconoBarra = contenedor.firstElementChild;


        iconoBarra.classList.remove('fa-xmark');
        iconoBarra.classList.add('fa-bars');

        
        barraLateral.style.display = 'none';


        const divCompleto = document.createElement('div');
        divCompleto.classList.add('contenedor-pantalla');


        divCompleto.innerHTML = `
            <div class="contenedor-pantalla__div">
                <i class="fa-solid fa-x contenedor-pantalla__icon"></i>
            </div>
            <div class="caja-padre">
                <div class="contenedor-pantalla__content">
                    <img src="/js/img5.jpg" class="contenedor-pantalla__img">
                </div>
                <a href="/admin/proyectos" class="text-center text-4xl">
                    <i class="fa-solid fa-lock bg-white px-3 py-2 color cursor-pointer rounded-lg"></i>
                </a>
            </div>
        `;

        document.querySelector('body').appendChild(divCompleto);

        const equis = document.querySelector('.fa-x');
        
        equis.addEventListener('click', salirPantalla);

    }
});

function salirPantalla(){
    const divCompleto = document.querySelector('.contenedor-pantalla');

    divCompleto.remove();
}



