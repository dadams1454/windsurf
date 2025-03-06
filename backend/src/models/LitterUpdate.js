module.exports = (sequelize, DataTypes) => {
  const LitterUpdate = sequelize.define('LitterUpdate', {
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
    updateDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    puppyAge: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Age of puppies at time of update (e.g., "3 weeks")'
    },
    weekNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Whether this update is visible to the public or just to reservation holders'
    },
    notificationSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    notificationSentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    attachedPhotoIds: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
      comment: 'IDs of LitterPhoto entries attached to this update'
    },
    weightData: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Weight data for puppies in the litter'
    },
    developmentMilestones: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Developmental milestones reached'
    }
  }, {
    timestamps: true
  });

  LitterUpdate.associate = (models) => {
    // An update belongs to a litter
    LitterUpdate.belongsTo(models.Litter, {
      foreignKey: 'litterId',
      as: 'litter'
    });

    // An update belongs to a breeder
    LitterUpdate.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });
  };

  return LitterUpdate;
};
