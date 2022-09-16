const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");

class NoteLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/notemodel");
        return model;
    }

    static getPk(){
        return "id";
    }

    static getWhere(search)
    {
        let where = {
            title : {
                [Op.like] : "%" + search + "%"
            } 
        }
        return where;
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

    static getOrder()
    {
        let order = [['createdAt', 'DESC']];
        return order;
    }

    /* 
        fetch notes based on category_id and project_id
    */
    static async findByCategoryAndProject(category_id, project_id, offset, limit)
    {
        try 
        {
            let model = this.getModel();
            let where = {
                [Op.and]: [
                    {category_id: category_id},
                    {project_id: project_id},
                    {user : { [Op.like] : this.session.user }}
                ]
            }

            if(category_id ==  "*" && project_id != "*")
            {
                where = {
                    [Op.and]: [
                        {category_id: category_id},
                        {user : { [Op.like] : this.session.user }}
                    ]                
                }
            }

            if(category_id !=  "*" && project_id == "*")
            {
                where = {
                    [Op.and]: [
                        {project_id: project_id},
                        {user : { [Op.like] : this.session.user }}
                    ]                
                }
            }

            if(category_id ==  "*" && project_id == "*")
            {
                where = {
                    user : { [Op.like] : this.session.user }            
                }
            }

            let result = await model.findAndCountAll({ where: where, offset: offset, limit: limit })
            return { success: true, payload: result }

        }
        catch(err)
        {
            throw { success: false, error: err, message: err.message }
        }
    }
}

module.exports = NoteLogic;