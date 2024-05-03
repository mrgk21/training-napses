import { DataTypes } from "sequelize";
import { dbInstance } from "../instance.js";

const CommentModel = dbInstance.define("Comments", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    commentableType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    commentableId: {
        type: DataTypes.UUID,
        allowNull: false,
        // unique: true, should it be unique? What is commentableId?
    }
})

export default CommentModel;