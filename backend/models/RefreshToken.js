const { Model } = require('sequelize');

module.exports = (sequelize,DataTypes) =>{

    class RefreshToken extends Model {
        static associate(models){
            this.belongsTo(models.User);
        }
    }

    RefreshToken.init({
        refreshToken : {
            primaryKey: true,
            type : DataTypes.STRING,
            unique : true,
            allowNull : false
        },
        UserId: {
          type: DataTypes.INTEGER,
          allowNull : false,
          primaryKey: true,
          references: {
            model: 'User',
            key: 'id'
          }
        }
    },{
        sequelize,
        modelName : 'RefreshToken',
        timestamps : false,
    });
    return RefreshToken;
}