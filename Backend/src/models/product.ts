import { DataTypes } from "sequelize";
import sequelize from "../database/connect";

export const Product = sequelize.define(
    'Product', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        timestamps: false

    });