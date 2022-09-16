const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");

class CategoryLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/categorymodel");
        return model;
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

    static getPk(){
        return "id";
    }

    static getWhere(search)
    {
        let where = {
            category_name : {
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

module.exports = CategoryLogic;