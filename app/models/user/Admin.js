const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        static associate(models) {
            Admin.belongsTo(models.User, {
                foreignKey: 'user_id'
            })
        }
    }

    Admin.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE'
            },
            full_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Full name is required'
                    }
                }
            },
            phone_number: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: 'Phone number is required'
                    }
                }
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Address is required'
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
            modelName: 'Admin',
            tableName: 'admins',
            freezeTableName: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )

    return Admin
}