import express from "express" //extrae la funcion
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



import appRouter from "./routes/appRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

import db from "./config/db.js";

const app = express();



app.use(cookieParser());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

async function conectarDB(){
    try {
        await db.authenticate();

        db.sync();

        console.log('Conectado a la base de datos correctamente')
    } catch (error) {
        console.log(error);
    }
} 

conectarDB();

app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, 'views'));



app.use(express.static(path.join(__dirname, 'public')));


// Routing
app.use('/', appRouter);
app.use('/admin', adminRouter);


const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});


export default app;