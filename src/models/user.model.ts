import {DataTypes, Model} from "sequelize"
import { sequelize } from "../database/connection"
export class User extends Model {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
}

export interface GetUserAttributes {
    id: number
    name: string
    email: string
    password: string
}

export type addUserAttributes = Omit<GetUserAttributes, 'id'>

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'users',
    sequelize,
    timestamps: true
})

