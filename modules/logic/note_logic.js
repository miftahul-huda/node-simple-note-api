const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const CategoryModel = require('../models/categorymodel');
const ProjectModel = require('../models/projectmodel');

const CrudLogic = require("./crudlogic");

class NoteLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/notemodel");
        return model;
    }

    static validateCreate(o)
    {
        if(o.project_id == null || o.project_id == -1)
        {
            return { success: false, message: 'Please set the project' }
        }

        if(o.category_id == null || o.category_id == -1)
        {
            return { success: false, message: 'Please set the category' }
        }

        if(o.title == null || o.title == "")
        {
            return { success: false, message: 'Please set the title' }
        }

        return {success: true}
    }

    static validateUpdate(o)
    {
        if(o.project_id == null || o.project_id == -1)
        {
            return { success: false, message: 'Please set the project' }
        }

        if(o.category_id == null || o.category_id == -1)
        {
            return { success: false, message: 'Please set the category' }
        }

        if(o.title == null || o.title == "")
        {
            return { success: false, message: 'Please set the title' }
        }

        return {success: true}
    }

    static getPk(){
        return "id";
    }

    static getWhere(search)
    {
        let where = {
            title : {
                [Op.iLike] : "%" + search + "%"
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
        let order = [[ 'createdAt', 'DESC']];
        return order;
    }

    static getModelIncludes()
    {
        return [ {model: ProjectModel, as: "project"}, { model: CategoryModel, as: "category"} ];
    }

    /* 
        fetch notes based on category_id and project_id
    */
    static async findByCategoryAndProject(category_id, project_id, offset, limit, sort)
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

            let opt = { where: where};
            if(offset != null)
                opt.offset = offset;

            if(limit != null)
                opt.limit = limit;

            if(sort != null)
                opt.sort = sort;
            
            opt.include = [ {model: ProjectModel, as: "project"}, { model: CategoryModel, as: "category"} ];

            console.log(opt)

            let result = await model.findAndCountAll(opt)
            return { success: true, payload: result }

        }
        catch(err)
        {
            throw { success: false, error: err, message: err.message }
        }
    }
}

module.exports = NoteLogic;