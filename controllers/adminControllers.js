// Modelo de tabla
import Admin from "../models/Admin.js";
import Proyectos from "../models/Proyectos.js"
// funciones js
import {enviarEmail} from '../helpers/mail.js';
import { generarToken } from "../helpers/token.js";
import path from 'path'; // con path puedes leer la ubicacion de un archivo o navegar en diferentes acarpetas 
import { fileURLToPath } from 'url'; // Para convertir import.meta.url a una ruta


// Dependencias
import { check, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import { where } from "sequelize";

dotenv.config();

// Obtén el directorio actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const formulario = (req, res)=>{
    res.render('auth/form', {
        pagina: 'Administrador'
    })
}

export const validacion = async (req, res)=>{
    // Validacion del formulario

    await check('nombre').isLength({min:1}).withMessage('El Campo NOMBRE está vacío').run(req);
    await check('email').isEmail().withMessage('Eso no parece ser un correo').run(req);
    await check('password').isLength({min:5}).withMessage('Revice la contraseña').run(req);

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        return res.render('auth/form', {
            pagina: 'Administrador',
            errores: resultado.array()
        })
    };

    // Validacion de los datos
    const {nombre} = req.body;
    const {email} = req.body;
    const {password} = req.body;

    const propietario = await Admin.findOne({where: {nombre, email, password}});

    if(!propietario){
        const id = generarToken();

        const mensajeHtml = `
            <h1>Alerta</h1>
            <h4>Alguien ha intentado ingresar al portafolio privado ¿has sido tu?</h4>
            <p>Si ha sido usted puedes ignorar este mensaje</a>, de lo contrario <a href="http://localhost:3000/admin/cambiar-password/${id}">cambia la contraseña</a></p>
        `;

        const usuario = await Admin.findOne({where: {email: process.env.EMAIL }});
        usuario.token = id;
        usuario.save();


        enviarEmail('gabytula08@gmail.com', process.env.EMAIL, 'PORTAFOLIO', 'Alguien ha intentado ingresar al portafolio privado ¿has sido tu?', mensajeHtml);


        return res.redirect('/');
    }

    const id = generarToken();

    // En el caso de que esté todo bien llevarlo a la pagina correspondiente
    const usuario = await Admin.findOne({where: {email: process.env.EMAIL }});
    usuario.validacion = id;
    await usuario.save();

    res.cookie('_apto', id).redirect('/admin/proyectos');
}

export const cambiar = async (req, res)=>{
    const {id} = req.params;
    const usuario = await Admin.findOne({where: {token: id }});
    
    if(!usuario){
        return res.redirect('/');
    }

    res.render('auth/cambiar', {
        pagina: 'Cambiar-Password'
    })
}

export const validar = async (req, res)=>{
    // Chequear que no esté vacío
    await check('password').isLength({min:5}).withMessage('La contraseña debe ser de mas de 5 caracteres').run(req);

    let resultado = validationResult(req);
    
    if(!resultado.isEmpty()){
        return res.render('auth/cambiar', {
            pagina: 'Cambiar-Password',
            errores: resultado.array()
        })
    };
    
    // Cambiar la contraseña
    const {password} = req.body;
    const {id} = req.params;
    const usuario = await Admin.findOne({where: {token: id }});

    usuario.password = password;
    usuario.token = null
    await usuario.save();

    res.redirect('/admin/login');
};

export const mostrarProyectos = async (req, res)=>{

    // consultar la base de datos
    const proyectos = await Proyectos.findAll();

    // res.json(proyectos);

    res.render('auth/layout/verProyectos', {
        pagina: 'Proyectos-publicados',
        titulo: 'Mis Proyectos',
        proyectos
    })
}


export const mostrarFormulario = (req, res)=>{
    res.render('auth/layout/agregar', {
        pagina: 'Agregar-Proyecto',
        titulo: 'Añadir Nuevo Proyecto'
    })
}

export const almacenarDatos = async (req, res)=>{

    const {titulo, urlImage, descripcion, proyecto, github} = req.body;
    try {
        await Proyectos.create({
            title: titulo,
            image_url: urlImage,
            description: descripcion,
            project_url: proyecto,
            github_url: github
        });
        
        res.json({msg: 'Datos almacenados correctamente'});

    } catch (error) {
        console.log(error);
    }
    
}

