module.exports = (sequelize, DataTypes) => sequelize.define("countries", {
    country_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    area_ref_name: { type: DataTypes.STRING },
    area_name: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    map_code: { type: DataTypes.STRING },
    area_type_code: { type: DataTypes.STRING },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
);