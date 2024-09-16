(function(){
    const imagen = document.querySelector('#img');
    const btn = document.querySelector('#btn');

    imagen.addEventListener('change', verificarCampo);

    function verificarCampo(e){
        if(imagen.value !== ''){
            btn.disabled = false;
            btn.classList.remove('bg-indigo-400');
            btn.classList.add('bg-indigo-700');
        }else{
            btn.disabled = true;
            btn.classList.remove('bg-indigo-700');
            btn.classList.add('bg-indigo-400');
        }
    }
})();