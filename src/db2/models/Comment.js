const { Model } = require("sequelize");

// Helper function
const uppercaseFirst = (str) => `${str[0].toUpperCase()}${str.substr(1)}`;

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * call the commentableType methods, e.g. : it calls getImage() and getVideo()
     */
    getCommentable(options) {
      if (!this.commentableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.commentableType)}`;
      return this[mixinMethodName](options);
    }

    static associate(models) {
      const { Image, Video } = models;
      this.belongsTo(Image, {
        foreignKey: "commentableId",
        constraints: false,
      });
      this.belongsTo(Video, {
        foreignKey: "commentableId",
        constraints: false,
      });
    }
  }

  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
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
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Comment",
      tableName: "Comment",
    },
  );

  /**
   * after getting the result, set resultItem.commentable = image or video
   */
  Comment.addHook("afterFind", (findResult) => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      // Image and Video strings will change according to association aliases (defaults to modelName)
      // what is this instance.commentable ??
      if (instance.commentableType === "Image" && instance.image !== undefined) {
        instance.commentable = instance.image;
      } else if (instance.commentableType === "Video" && instance.video !== undefined) {
        instance.commentable = instance.video;
      }
      // To prevent mistakes:
      delete instance.image;
      delete instance.dataValues.image;
      delete instance.video;
      delete instance.dataValues.video;
    }
  });

  return Comment;
};
/**
 * FLOW:
 *
 * 1. CREATE AN IMAGE
 *
 * const img = createImage();
 * const comment = img.createComment();
 *
 * const same_img = comment.getCommentable(); // in-turn runs getVideo and getImage
 *
 * // img and same_img should be equal
 *
 * 2. GET A COMMENT + ITS IMAGE
 *
 * const comment = comment.findOne({includes: [{model: Image}, {model: Video}]});
 * const img = comment.commentable; // will include Image / Video
 *
 */
