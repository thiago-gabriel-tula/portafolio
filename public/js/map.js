document.addEventListener('DOMContentLoaded', cargarMapa);



function cargarMapa(){
    const containerMapa = document.querySelector('#load-iframe-map');
    containerMapa.innerHTML = `<span class="loader"></span>`;

    setTimeout(function(){
        // containerMapa.innerHTML = '';
        containerMapa.innerHTML = `
            <iframe class="contact__iframe" frameborder="0" scrolling="none" marginheght="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210194.5948810695!2d-58.96731762896914!3d-34.59681385434567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9748b3e4196f%3A0x20c321ba3cf511e8!2sMoreno%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1707756490859!5m2!1ses!2sar" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

         `; 
    }, 3000);    
}



