import { DataTypes } from "sequelize";
import { dbInstance } from "../instance.js";

const ImageModel = dbInstance.define("Images", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default ImageModel;