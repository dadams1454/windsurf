module.exports = (sequelize, DataTypes) => {
  const LitterPhoto = sequelize.define('LitterPhoto', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    litterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Litters',
        key: 'id'
      }
    },
    breederId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    originalFilename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    puppyAge: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Age of puppies when photo was taken (e.g., "2 weeks")'
    },
    photoDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    uploadDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    isCoverPhoto: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weekNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Week number when photo was taken (for weekly updates)'
    }
  }, {
    timestamps: true
  });

  LitterPhoto.associate = (models) => {
    // A photo belongs to a litter
    LitterPhoto.belongsTo(models.Litter, {
      foreignKey: 'litterId',
      as: 'litter'
    });

    // A photo belongs to a breeder
    LitterPhoto.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });
  };

  return LitterPhoto;
};
