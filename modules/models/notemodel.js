const { Model, DataTypes } = require('sequelize');

class NoteModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            title: DataTypes.STRING,
            short_desc: DataTypes.STRING,
            content: DataTypes.TEXT,
            tags: DataTypes.STRING,
            user: DataTypes.STRING,
            category_id: DataTypes.INTEGER,
            project_id: DataTypes.INTEGER,
        }, 
        { sequelize, modelName: 'note', tableName: 'note', force: force });
    }
}

module.exports = NoteModel;