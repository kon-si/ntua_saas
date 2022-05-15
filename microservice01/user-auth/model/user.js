module.exports = (sequelize, DataTypes) => sequelize.define("users", {
    user_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.TEXT },
    last_name: { type: DataTypes.TEXT },
    username: { type: DataTypes.TEXT, unique: true },
    email: { type: DataTypes.TEXT, unique: true },
    password_hash: { type: DataTypes.TEXT },
    telephone: { type: DataTypes.NUMERIC },
    address: { type: DataTypes.TEXT },
    expiration_date: { type: DataTypes.DATE },
    auth_token: { type: DataTypes.TEXT },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
);