const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Role, {
                through: 'users_has_roles',
                foreignKey: 'user_id',
                otherKey: 'role_id'
            })
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Name is required'
                    }
                }
            },
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: 'Username is required'
                    },
                    len: {
                        args: [6, 50],
                        msg: 'Username must be at least 6 characters long and less than 50 characters'
                    }
                }
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: 'Email is invalid'
                    },
                    notEmpty: {
                        msg: 'Email is required'
                    }
                }
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Username is required'
                    }
                }
            },
            created_at: {
                field: 'created_at',
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                field: 'updated_at',
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            freezeTableName: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )

    return User
}