import Sequelize from 'sequelize';
import mysql2 from 'mysql2';
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Simula __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: path.join(__dirname, '.env') });
const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, { //toma 4 parametros. Nombre de la base de datos, el usuario, el password y un objeto de configuracion
   
    host: process.env.BD_HOST,
    port:3307,
    dialect:'mysql', 
    dialectModule: mysql2, 
    define: {
        timestamp: true 
    },
    pool: { 
        max:15, 
        min:0, 
        adquire:30000,
        idle: 10000  
    },
    operatorAliases: false
});

export default db;