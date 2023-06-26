const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.belongsToMany(models.User, {
                through: 'users_has_roles',
                foreignKey: 'role_id',
                otherKey: 'user_id'
            })
        }
    }

    Role.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: {
                        msg: 'Name is required'
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
            modelName: 'Role',
            tableName: 'roles',
            freezeTableName: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    )

    return Role
}