import {Sequelize} from 'sequelize';
import db from '../config/db.js';

const Proyectos = db.define('proyectos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image_url: {
        type: Sequelize.STRING(255),
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    project_url: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    github_url: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    publicado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true 
    }
});

export default Proyectos;