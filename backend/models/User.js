const { Model } = require('sequelize');

const SHA256 = require('crypto-js/sha256')

const hashPassword = (password) => SHA256(password).toString()
const hashUserPassword = (user) => {
  if (user.changed('password')) {
    user.password = hashPassword(user.password)
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.RefreshToken);
      this.hasMany(models.Number);
    }

    matchPassword = (password) => { return this.password === hashPassword(password) }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true
      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6]
        },
        notNull: true,
        notEmpty: true,
      }
    },
    //the number the user gets from calculator
    calcNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            isNumeric: true
        }
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    hooks: {
      beforeCreate: hashUserPassword,
      beforeUpdate: hashUserPassword
    },
  });
  return User;
};