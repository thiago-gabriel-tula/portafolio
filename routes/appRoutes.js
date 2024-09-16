import express from "express";

import { inicio, sobreMi, curriculum, proyectos, contacto, sendMensaje, consultarProyectos } from "../controllers/appControllers.js";

const router = express.Router();

router.get('/', inicio);

router.get('/sobre-mi', sobreMi);

router.get('/curriculum', curriculum);

router.get('/portafolio', proyectos);

router.get('/contacto', contacto);
router.post('/contacto', sendMensaje);

// ruta publica de los proyectos
router.get('/api/proyectos', consultarProyectos);


export default router;