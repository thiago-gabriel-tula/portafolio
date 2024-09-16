(function(){
    
    // Seleccionar los elementos del dom
    const titulo = document.querySelector('#titulo');
    const urlImage = document.querySelector('#urlImage');
    const descripcion = document.querySelector('#descripcion');
    const proyecto = document.querySelector('#proyecto');
    const github = document.querySelector('#github');
    const btn = document.querySelector('#btn');

    let datos = {
        titulo: '',
        urlImage: '',
        descripcion: '',
        proyecto: '',
        github: '',
    }

    // Eventos en los inputs
    titulo.addEventListener('input', verificarInput);
    urlImage.addEventListener('input', verificarInput);
    descripcion.addEventListener('input', verificarInput);
    proyecto.addEventListener('input', verificarInput);
    github.addEventListener('input', verificarInput);
    btn.addEventListener('click', verificarDatos);


    let currentURL;
    let lastSegment;

    // Funciones
    document.addEventListener("DOMContentLoaded", function() {
        // Obtener la URL completa
        currentURL = window.location.pathname;

        // Dividir la ruta en segmentos por "/"
        let pathSegments = currentURL.split('/');

        // Obtener la última parte del path
        lastSegment = pathSegments[pathSegments.length - 1];

    });
    



    function verificarInput(e){
        verificarCampos();

        if(e.target.value == ''){
            if(!document.querySelector(`.existe-${e.target.name}`)){
                const mensajeError = document.createElement('p');
                mensajeError.textContent = 'El campo está vacío';
                mensajeError.classList.add('text-white', 'bg-red-500', 'px-2', 'text-center', 'font-bold', 'py-1', 'rouded', 'w-auto', `existe-${e.target.name}`);

                const elementoPadre = e.target.parentNode;

                elementoPadre.insertBefore(mensajeError, elementoPadre.firstChild);

                setTimeout(function(){
                    mensajeError.remove();
                }, 3000)
            }

        }
    }

    function verificarCampos(){
        if(titulo.value !== "" && descripcion.value !== "" && proyecto.value !== "" && github.value !== "" && urlImage.value !== ""){

            btn.disabled = false;
            btn.classList.remove('bg-indigo-400');
            btn.classList.add('bg-indigo-700');

        }else{
            btn.disabled = true;
            btn.classList.remove('bg-indigo-700');
            btn.classList.add('bg-indigo-400');
        }
    }

    async function verificarDatos(e){
        e.preventDefault();

        if(titulo.value == "" || descripcion.value == "" || proyecto.value == "" || github.value == ""  || urlImage.value == ""){
            return console.log('No se pueden enviar los datos vacios');
        }

        // Llenar datos
        datos.titulo = titulo.value;
        datos.urlImage = urlImage.value;
        datos.descripcion = descripcion.value;
        datos.proyecto = proyecto.value;
        datos.github = github.value;

        // Enviar datos al servidor 
        if(currentURL.startsWith("/admin/editar")){
            const url = `/admin/editar/${lastSegment}`;
            try {
                const respuesta = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(datos)
                });

                const resultado = await respuesta.json();
                console.log('Respuesta del servidor:', resultado);
                
                // Redirigir a la página deseada
                window.location.href = '/admin/proyectos';

            } catch (error) {
                console.log(error);
            }

        }else{
            const url = '/admin/proyectos/agregar';
            try {
                const respuesta = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(datos)
                });

                const resultado = await respuesta.json();
                console.log('Respuesta del servidor:', resultado);
                
                // Redirigir a la página deseada
                window.location.href = '/admin/proyectos';

            } catch (error) {
                console.log(error);
            }
        }
        
    }


})();