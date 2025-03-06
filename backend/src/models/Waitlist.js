module.exports = (sequelize, DataTypes) => {
  const Waitlist = sequelize.define('Waitlist', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    breederId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    contactId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Contacts',
        key: 'id'
      }
    },
    addedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    breedPreference: {
      type: DataTypes.STRING,
      allowNull: true
    },
    colorPreference: {
      type: DataTypes.STRING,
      allowNull: true
    },
    genderPreference: {
      type: DataTypes.ENUM('Male', 'Female', 'No Preference'),
      defaultValue: 'No Preference'
    },
    timeframe: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'When the contact is looking to get a puppy'
    },
    status: {
      type: DataTypes.ENUM('Active', 'Contacted', 'Reserved', 'Removed', 'Expired'),
      defaultValue: 'Active'
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: 'Higher number means higher priority'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastContactDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reminderSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reminderSentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: 'Date when this waitlist entry expires if no action is taken'
    },
    depositPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    depositAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    depositDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    additionalRequirements: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  Waitlist.associate = (models) => {
    // A waitlist entry belongs to a breeder
    Waitlist.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A waitlist entry belongs to a contact
    Waitlist.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      as: 'contact'
    });
  };

  return Waitlist;
};
