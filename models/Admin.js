import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const Admin = db.define('admin', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    token: Sequelize.STRING,
    validacion: Sequelize.STRING
});

export default Admin;