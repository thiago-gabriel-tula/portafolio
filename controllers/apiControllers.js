import Proyectos from "../models/Proyectos.js";


export const apiEliminar = async (req, res) => {
    // Buscar proyecto por el params
    const {id} = req.params

    const proyecto = await Proyectos.findByPk(id);

    // verificar que exista el proyecto
    if(!proyecto){
        // TODO: Manejar errores y dar mensaje
    }

    // eliminar de la base de datos
    await proyecto.destroy();

    // Dar respuesta json al cliente
    res.json({msg: 'Proyecto eliminado correctamente'})
    
};

export const editarProyectos = async (req, res)=>{
    const {id} = req.params;

    const proyecto = await Proyectos.findByPk(id);


    res.render('auth/layout/editar', {
        titulo: 'Editar proyecto',
        pagina: 'Editar',
        proyecto
    })
}

export const cambiarDatos = async (req, res)=>{
    const {titulo, descripcion, proyecto, github} = req.body;    
    const {id} = req.params;

    const proyectoModificado = await Proyectos.findByPk(id);

    proyectoModificado.title = titulo;
    proyectoModificado.description = descripcion;
    proyectoModificado.project_url = proyecto;
    proyectoModificado.github_url = github;

    await proyectoModificado.save();

    res.cookie('changeImg', proyecto).json({msg: 'cambiado'})
}



export const publicarProyecto = async (req, res)=>{
    const {id} = req.params;

    const proyecto = await Proyectos.findByPk(id);

    if(proyecto.publicado == 1){
        proyecto.publicado = 0;
        await proyecto.save();

    }else{
        proyecto.publicado = 1;
        await proyecto.save();

    }

    res.json({msg: true})
} 



// Función para verificar la existencia del archivo
async function archivoExiste(ruta) {
    try {
        await access(ruta);
        return true; // El archivo existe
    } catch (error) {
        return false; // El archivo no existe
    }
}