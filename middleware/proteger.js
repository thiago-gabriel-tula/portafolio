import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();


export const protegerRuta = async (req, res, next)=>{
    // Validar si hay cookie
    const cookieValue = req.cookies['_apto'];

    if(!cookieValue){
        return res.redirect('/admin/login');
    }

    // Validar el valor de la cookie
    const admin = await Admin.findOne({where: {validacion: cookieValue}});

    if(!admin){
        return res.redirect('/admin/login');
    }

    return next();
}