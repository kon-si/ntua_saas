module.exports = (sequelize, DataTypes) => sequelize.define("actual_total", {
    total_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date_time: { type: DataTypes.DATE },
    resolution_code: { type: DataTypes.STRING },
    area_code: { type: DataTypes.STRING },
    area_type_code: { type: DataTypes.STRING },
    area_name: { type: DataTypes.STRING },
    map_code: { type: DataTypes.STRING },
    total_load_value: { type: DataTypes.INTEGER },
    update_time: { type: DataTypes.DATE },
    },
    {
      freezeTableName: true,
      timestamps: false
    },
);