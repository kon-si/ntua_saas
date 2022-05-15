module.exports = (sequelize, DataTypes) => sequelize.define("users", {
    user_id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password_hash: { type: DataTypes.STRING },
    telephone: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    expiration_date: { type: DataTypes.DATE },
    auth_token: { type: DataTypes.TEXT },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
);