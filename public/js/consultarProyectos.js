(function(){
   document.addEventListener('DOMContentLoaded', mostrarProyectos);
    const ancho = window.innerWidth;

    let informacion = {
        imagen: '',
        titulo: '',
        descripcion: '',
        enlaceProyecto: '',
        enlaceGithub: ''
    }

   async function mostrarProyectos(){
        try {
            const datos = await fetch('/api/proyectos');

            const resultado = await datos.json();

            agegarProyectos(resultado);

        } catch (error) {
            console.log(error)
        }
   }

   function agegarProyectos(array){
        array.forEach(proyecto => {
            const section = document.querySelector('#seccion');
        
            const figure = document.createElement('figure');
            figure.classList.add('lg:w-1/3', 'shadow', 'px-3', 'pb-5', 'pt-1', 'rounded', 'cursor-pointer');
            

            // contenedor de la imagen del proyecto
            const divImg =  document.createElement('div');
            divImg.classList.add('rounded-lg', 'overflow-hidden');
            divImg.addEventListener('click', capturarDatos);

            const imagen = document.createElement('img');
            imagen.src = `${proyecto.image_url}`;


            // Seccion de descripcion y enlaces
            const divContenedor =  document.createElement('div');
            divContenedor.classList.add('lg:hidden', 'mt-1');


            // Seccion de titulo
            const divTitulo = document.createElement('h1');
            divTitulo.textContent = proyecto.title;
            divTitulo.classList.add('font-bold', 'uppercase', 'color', 'text-center', 'mt-3', 'mb-3')

            // Contenedor de la descripcion
            const cajaTexto = document.createElement('div');
            cajaTexto.classList.add('my-2', 'px-2');
            cajaTexto.innerHTML = `
                <h2 class="font-bold">Descripción</h2>
                <p class="ml-2">${proyecto.description}</p>
            `;


            const divEnlaces = document.createElement('div');
            divEnlaces.classList.add('flex', 'flex-row', 'justify-center', 'gap-3', 'mt-3')

            const enlaceProyecto = document.createElement('a');
            enlaceProyecto.href = proyecto.project_url;
            enlaceProyecto.classList.add('inline-block', 'shadow', 'py-3', 'px-5', 'rounded-lg', 'moverse');

            const iconoProyecto = document.createElement('i');
            iconoProyecto.classList.add('fa-solid', 'fa-link', 'text-5xl');

            enlaceProyecto.appendChild(iconoProyecto);

            const enlaceGithub = document.createElement('a');
            enlaceGithub.href = proyecto.github_url;
            enlaceGithub.classList.add('inline-block', 'shadow', 'py-3', 'px-5', 'rounded-lg', 'moverse');
            const iconoGithub = document.createElement('i');
            iconoGithub.classList.add('fa-brands', 'fa-github', 'text-5xl');

            enlaceGithub.appendChild(iconoGithub);

            divEnlaces.appendChild(enlaceProyecto);
            divEnlaces.appendChild(enlaceGithub);

            divImg.appendChild(imagen);

            divContenedor.appendChild(cajaTexto);
            divContenedor.appendChild(divEnlaces);

            figure.appendChild(divImg);
            figure.appendChild(divTitulo);
            figure.appendChild(divContenedor);

            section.appendChild(figure);

        });
    
    }

   function capturarDatos(e){
        if(ancho >= 1024){

            const elementoPadre = e.target.parentElement.parentElement;

            // capturar imagen
            const contenedorImagen = elementoPadre.childNodes[0];
            const imagen = contenedorImagen.childNodes[0];
            const ultimaParteImagen = imagen.src;

            // Capturar Titulo
            const titulo = elementoPadre.childNodes[1].textContent;

            // capturar descripcion
            const descripcion = elementoPadre.childNodes[2].childNodes[0].childNodes[3].textContent;

            // capturar enlace del proyecto 
            const enlaceDelProyecto = elementoPadre.childNodes[2].childNodes[1].childNodes[0].href;
            // const ultimaParteEnlaceProyecto = enlaceDelProyecto.split('/').pop();
            

            // Capturar enlace a github
            const enlaceAgitHub = elementoPadre.childNodes[2].childNodes[1].childNodes[1].href;
            // const ultimaParteEnlaceGithub = enlaceAgitHub.split('/').pop();


            // llenar objeto
            informacion.imagen = ultimaParteImagen;
            informacion.titulo = titulo;
            informacion.descripcion = descripcion;
            informacion.enlaceProyecto = enlaceDelProyecto;
            informacion.enlaceGithub = enlaceAgitHub;

            mostrarEnPantalla(informacion);

        }else{
            console.log('Funcion no apta para la pantalla');
        }
    }

    function mostrarEnPantalla(obj){
        const body = document.body;
        console.log(obj);

        const nuevoDiv = document.createElement('div');
        nuevoDiv.classList.add('absolute', 'inset-y-0', 'inset-x-0', 'fondo_borroso', 'overflow-y-auto', 'nuevo');

        nuevoDiv.innerHTML = `
            <div class="w-3/6 mx-auto mt-20 h-auto bg-slate-100 overflow-hidden sombra px-4 pt-3">
                <div class="w-full h-auto">
                    <i id="salir" class="fa-solid fa-xmark text-5xl color cursor-pointer"></i>
                </div>
                <div class="mt-3 px-2 py-2">
                    <img src="${obj.imagen}" alt="Imagen del proyecto">
                </div>
                <h1 class="font-bold uppercase color text-center mt-3 mb-3 ">${obj.titulo}</h1>
                <div class="mt-2">
                    <h3 class="font-bold">Descripción</h3>
                    <p class="ml-2">${obj.descripcion}</p>
                </div>
                <div class="flex flex-row mt-5 mb-5 justify-center space-x-4">
                    <a href="${obj.enlaceProyecto}" class="moverse px-7 py-2 shadow rounded-lg">
                        <i class="fa-solid fa-link text-5xl"></i>
                    </a>
                    <a href="${obj.enlaceGithub}" class="moverse px-7 py-2 shadow rounded-lg">
                        <i class="fa-brands fa-github text-5xl"></i>
                    </a>
                </div>
            </div>

        `;


        
        body.appendChild(nuevoDiv);
        document.querySelector('#salir').addEventListener('click', salir);
    }


    function salir(){
        const div = document.querySelector('.nuevo');

        div.remove();
    }
})();