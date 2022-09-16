const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");

class ProjectLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/projectmodel");
        return model;
    }

    static getPk(){
        return "id";
    }

    static getDefaultWhere(search)
    {
        let where = {
            user : {
                [Op.like] : "" + this.session.user + ""
            } 
        }
        return where;        
    }

    static getWhere(search)
    {
        let where = {
            project_name : {
                [Op.like] : "%" + search + "%"
            } 
        }
        return where;
    }

    static getOrder()
    {
        let order = [['createdAt', 'DESC']];
        return order;
    }
}

module.exports = ProjectLogic;