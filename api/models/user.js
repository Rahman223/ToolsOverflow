'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
  
    User.init({
        userName: {
            type : DataTypes.STRING,
            primaryKey: true
        },

        passwordHash: { type: DataTypes.STRING },

        password: {
            type: DataTypes.VIRTUAL,
            // validate: {
            //     isLongEnough:  (val) => {
            //         if (val.length < 7) {
            //             throw new Error("Please choose a longer password");
            //         }
            //     },
            // }
        },

        email: {
            type : DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },

        fName: {
            type : DataTypes.STRING,
        },

        lName: {
            type : DataTypes.STRING,
        },

        profilePic: {
            type : DataTypes.TEXT,
        },

    }, {
      sequelize,
      modelName: 'user'
    });
  
    User.associate = (models) => {
      // associations are defined here

    //   //this will add locationId to user
    //   //Instances of User will get the accessors getLocation and setLocation.
    //   models.User.belongsTo(models.Location)

      //this will add userName to Post 
      //Instances of User will get the accessors getPosts and setPosts.
      models.User.hasMany(models.Post , {foreignKey: 'fkUserName'})

      //This will add the borrowerId column to post
      //User instance will get the accessors getPost and setPost
      models.User.hasOne(models.Post, {foreignKey: "borrowerId"})
      
    };

    User.beforeSave((user, options) => {
        if(user.password) {
          user.passwordHash = bcrypt.hashSync(user.password, 5);
        }
    });
  
    return User;
  };