module.exports = (sequelize, DataTypes) => sequelize.define("userdb", {
    email: { type: DataTypes.TEXT, primaryKey: true },
    first_name: { type: DataTypes.TEXT },
    last_name: { type: DataTypes.TEXT },
    password: { type: DataTypes.TEXT },
    token: { type: DataTypes.TEXT },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
);