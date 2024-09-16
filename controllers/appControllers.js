import { check, validationResult } from 'express-validator';
import { enviarEmail } from '../helpers/mail.js';
import Proyectos from '../models/Proyectos.js';

const inicio = (req, res)=>{
    res.render('templates/home', {
        pagina : 'Home',
        color: 1
    })
};

const sobreMi = (req, res)=>{
    res.render('templates/sobre-mi', {
        pagina: 'Sobre-mi',
        color: 2
    })
}


const curriculum = (req, res)=>{
    res.render('templates/curriculum', {
        pagina: 'Curriculum',
        color: 3
    })
}

const proyectos = async (req, res)=>{
    res.render('templates/portafolio', {
        pagina: 'Proyectos',
        color: 4
    })
}

const contacto = (req, res)=>{
    res.render('templates/contacto', {
        pagina: 'Contacto',
        color: 5
    })
}

const sendMensaje = async (req, res)=>{
    // Validar el formulario
    await check('nombreUsuario').isLength({min: 1}).withMessage('El campo Nombre no puede ir vacío').run(req);
    await check('email').isEmail().withMessage('Debe de ser un Email válido').run(req);
    await check('asunto').isLength({max: 20, min: 3}).withMessage('El asunto debe de tener 20 caracteres maximo').run(req);
    await check('message').isLength({min: 4}).withMessage('El mensaje es muy corto').run(req);
    let resultado = validationResult(req);


    if(!resultado.isEmpty()){
        // res.send(resultado.array())
        return res.render('templates/contacto', {
            pagina: 'Contacto',
            color: 5,
            errores: resultado.array()
        });
    }

    // Enviar Email y renderizar pagina
    const {nombreUsuario: nombre, email, asunto, message: mensaje} = await req.body;

    const htmlMensaje = `
        <h1>Hola Thiago, ${nombre} te ha escrito...</h1>
        <h4>Ha visto tu portafolio y te dejó este mensaje</h4>
        <p>${mensaje}</p>                
    `;

    try {
        enviarEmail('gabytula08@gmail.com', 'tulathiago08@gmail.com', nombre, asunto, mensaje, htmlMensaje);

        res.render('templates/contacto', {
            pagina: 'Contacto',
            color: 5,
            enviado: 'Su mensaje se ha enviado correctamente'
        })

    } catch (error) {
        console.log(error);
    }

}

export const consultarProyectos = async (req, res)=>{
    const proyectos = await Proyectos.findAll({where: {publicado: 1}});

    res.json(proyectos);
}


export {
    inicio,
    sobreMi,
    curriculum,
    proyectos,
    contacto,
    sendMensaje
}