//const LoggerModel  = require( './modules/models/loggermodel')

const { Sequelize, Model, DataTypes } = require('sequelize');
const process = require('process');

const CategoryModel = require("./modules/models/categorymodel")
const ProjectModel = require("./modules/models/projectmodel")
const NoteModel = require("./modules/models/notemodel")


const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: process.env.DBENGINE  
});


class Initialization {
    static async initializeDatabase(){

        let force = false;
        CategoryModel.initialize(sequelize, force)
        ProjectModel.initialize(sequelize, force)
        NoteModel.initialize(sequelize, force)
        
        await sequelize.sync();
    }
}

module.exports = Initialization



