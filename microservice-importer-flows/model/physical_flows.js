module.exports = (sequelize, DataTypes) => sequelize.define("physical_flows", {
    flow_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date_time: { type: DataTypes.DATE },
    resolution_code: { type: DataTypes.STRING },
    out_area_code: { type: DataTypes.STRING },
    out_area_type_code: { type: DataTypes.STRING },
    out_area_name: { type: DataTypes.STRING },
    out_map_code: { type: DataTypes.STRING },
    in_area_code: { type: DataTypes.STRING },
    in_area_type_code: { type: DataTypes.STRING },
    in_area_name: { type: DataTypes.STRING },
    in_map_code: { type: DataTypes.STRING },
    flow_value: { type: DataTypes.FLOAT },
    update_time: { type: DataTypes.DATE },
    },
    {
      freezeTableName: true,
      timestamps: false
    },
);