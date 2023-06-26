const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        static associate(models) {
            Employee.belongsTo(models.User, {
                foreignKey: 'user_id'
            })
        }
    }

    Employee.init(
        {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV1,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE'
            },
            full_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Full name is required'
                    }
                }
            },
            phone_number: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: 'Phone Number is required'
                    }
                }
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'Address is required'
                    }
                }
            },
            created_at: {
                field: 'created_at',
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                field: 'updated_at',
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        },
        {
            sequelize,
            modelName: 'Employee',
            tableName: 'employees',
            freezeTableName: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )

    return Employee
}