const { Model, DataTypes } = require('sequelize');

class CategoryModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            category_name: DataTypes.STRING,
            description: DataTypes.STRING,
            user: DataTypes.STRING
        }, 
        { sequelize, modelName: 'category', tableName: 'category', force: force });
    }
}

module.exports = CategoryModel;