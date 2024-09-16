import express from "express";

import {formulario, validacion, cambiar, validar, mostrarProyectos, mostrarFormulario, almacenarDatos} from '../controllers/adminControllers.js';
import { apiEliminar, editarProyectos, cambiarDatos, publicarProyecto} from "../controllers/apiControllers.js";
import { protegerRuta } from "../middleware/proteger.js";


const router = express.Router();

router.get('/login', formulario);
router.post('/login', validacion);

router.get('/cambiar-password/:id', cambiar);
router.post('/cambiar-password/:id', validar);

router.get('/proyectos', protegerRuta, mostrarProyectos);

// publicar proyectos
router.put('/publicar/:id', publicarProyecto);

// editar proyectos
router.get('/editar/:id', protegerRuta, editarProyectos);
router.post('/editar/:id', protegerRuta, cambiarDatos);

// eliminar proyectos
router.delete('/proyectos/:id',protegerRuta, apiEliminar);



router.get('/proyectos/agregar', protegerRuta, mostrarFormulario);
router.post('/proyectos/agregar', protegerRuta, almacenarDatos);


export default router;