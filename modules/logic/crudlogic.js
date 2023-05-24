const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");


class CrudLogic {

    static getModel()
    {
        return null;
    }
    
    static getPk(){
        return "id";
    }

    static totalData(search)
    {

    }

    static async create(o)
    {
        o = this.initCreate(o);

        console.log("o")
        console.log(o)

        const CurrentModel = this.getModel();

        let result = this.validateCreate(o);
        if(result.success){
            try {
                let newO = await CurrentModel.create(o);
                result.payload = newO;
                return  result;
            }
            catch(error)
            {
                throw { success: false, message: '', error: error };
            }
            
        }
        else
        {
            throw result
        }

    }

    static async findAll(where=null, offset=null, limit=null,  order=null)
    {
        try{
            const CurrentModel = this.getModel();
            
            let opt = {};
            if(offset != null)
                opt.offset = offset;
            
            if(limit != null)
                opt.limit = limit;

            if(order != null)
                opt.order = order;
            else
            {
                opt.order = this.getOrder();
            }

            let defaultWhere =  this.getDefaultWhere();
            if(defaultWhere != null)
                opt.where = defaultWhere;

            if(where != null)
                opt.where = {[Op.and]: [
                    opt.where,
                    where 
            ]}


            let includes = this.getModelIncludes();
            if(includes != null)
                opt.include = includes;
                
            let os  = await CurrentModel.findAndCountAll(opt)
            return { success: true, payload: os }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

 
    static async findByKeyword(search, offset=null, limit=null, order=null)
    {
        let where = this.getWhere(search);

        if(order == null)
            order = this.getOrder();

        try {

            let result = await this.findAll(where, offset, limit, order);
            return result
        }
        catch(error)
        {
            throw { success: false, message: '', error: error };
        }
        
    }

    static async get(id)
    {
        try{
            const CurrentModel = this.getModel();
            let pk = this.getPk();
            let where = {};
            where[pk] = id;

            let opt = {};
            opt.where = where;
            
            let includes = this.getModelIncludes();
            if(includes != null)
                opt.include = includes;
            

            let o  = await CurrentModel.findOne(opt);
            return { success: true, payload: o }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  o)
    {
        o = this.initUpdate(o);

        let result = this.validateUpdate(o);
        let pk = this.getPk();
        if(result.success){
            try {
                const CurrentModel = this.getModel();
                let where = {};
                where[pk] = id;

                let newO = await CurrentModel.update(o, { where:  where  });
                result.payload = newO;
                return  result;
            }
            catch(error)
            {
                throw { success: false, message: '', error: error };
            }
            
        }
        else
        {
            throw result
        }

    }

    static async delete(id)
    {
        try{
            let result = {};
            let pk = this.getPk();
            const CurrentModel = this.getModel();
            let where = {};
            where[pk] = id;

            let ids = id.split(",");
            console.log("ids")
            console.log(ids)
            if(ids.length > 0)
            {
                where[pk] = {
                    [Op.in] : ids
                }

                result = await CurrentModel.destroy({ where: where });
                return { success: true, payload: result }
            }
            else
            {
                result = await CurrentModel.destroy({ where: where });
                return { success: true, payload: result }
            }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(o){
        
        return {success :  true, message: "Succesfull"}
    }

    static validateUpdate(o)
    {   
        return {success :  true, message: "Succesfull"}
    }

    static initCreate(o)
    {
        return o;
    }

    static  initUpdate(o)
    {
        return o;
    }


    static getOrder()
    {
        return null;
    }

    static getDefaultWhere()
    {
        return null;
    }

    static getModelIncludes()
    {
        return null;
    }
}

module.exports = CrudLogic;