(function(){
    // boton de publicado
    const btnPublicar = document.querySelectorAll('.btn-publicar');
    btnPublicar.forEach(boton => {
        boton.addEventListener('click', publicar);
    })

    // boton de editar
    const btnEditar = document.querySelectorAll('.btn-editar');

    btnEditar.forEach(boton => {
        boton.addEventListener('click', actualizar);
    })

    // boton de eliminar
    const btnEliminar = document.querySelectorAll('.btn-eliminar');

    btnEliminar.forEach((boton)=>{
        boton.addEventListener('click', eliminar);
    })


    // Funciones

    async function eliminar(e){
        const id = e.target.parentElement.parentElement.parentElement.id;

        try {
            const respuesta = await fetch(`${window.location.origin}/admin/proyectos/${id}`, {
                method: 'DELETE'
            });

            const resultado = await respuesta.json();

            console.log(resultado);

            location.reload();

        } catch (error) {
            console.log(`Ocurrió un error a la hora de querer eliminar:  ${error}`)
        }
    }



    async function actualizar(e){

        const id = e.target.parentElement.parentElement.parentElement.id;


        // redireccionar para editar
        window.location.href = `/admin/editar/${id}`;
    }

    async function publicar(e){
        const id =  e.target.parentElement.parentElement.parentElement.id;

        const boton = e.target;
        if(boton.textContent == 'publicado'){
            boton.textContent = 'No publicado';

            boton.classList.remove('bg-green-100', 'border-green-600', 'text-green-600');
            boton.classList.add('bg-yellow-100', 'border-yellow-600', 'text-yellow-600');
        }else{
            boton.textContent = 'publicado';

            boton.classList.remove('bg-yellow-100', 'border-yellow-600', 'text-yellow-600');   
            boton.classList.add('bg-green-100', 'border-green-600', 'text-green-600');
        }

        try {
            const cambiar = await fetch(`/admin/publicar/${id}`, {
                method: 'PUT'
            });



        } catch (error) {
            console.log(`Ocurrio un error a la hora de cambiar el estado: ${error}`)
        }
    }
    
})();