const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class UserHasRole extends Model { }

    UserHasRole.init(
        {
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE'
            },
            role_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id'
                },
                onUpdate: 'CASCADE'
            }
        },
        {
            sequelize,
            modelName: 'UserHasRole',
            tableName: 'users_has_roles',
            underscored: true,
            timestamps: false
        }
    )

    return UserHasRole
}