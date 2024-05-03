import { DataTypes } from "sequelize";
import { dbInstance } from "../instance.js";

const VideoModel = dbInstance.define("Videos", {
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
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default VideoModel;