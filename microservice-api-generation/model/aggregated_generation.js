module.exports = (sequelize, DataTypes) => sequelize.define("aggregated_generation", {
    generation_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date_time: { type: DataTypes.DATE },
    resolution_code: { type: DataTypes.STRING },
    area_code: { type: DataTypes.STRING },
    area_type_code: { type: DataTypes.STRING },
    area_name: { type: DataTypes.STRING },
    map_code: { type: DataTypes.STRING },
    production_type: { type: DataTypes.STRING },
    actual_generation_output: { type: DataTypes.INTEGER },
    actual_consumption: { type: DataTypes.INTEGER },
    update_time: { type: DataTypes.DATE },
    },
    {
      freezeTableName: true,
      timestamps: false
    },
);