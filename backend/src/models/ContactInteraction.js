module.exports = (sequelize, DataTypes) => {
  const ContactInteraction = sequelize.define('ContactInteraction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    contactId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Contacts',
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    type: {
      type: DataTypes.ENUM('Email', 'Phone', 'Text', 'Meeting', 'Social Media', 'Form Submission', 'Other'),
      allowNull: false
    },
    direction: {
      type: DataTypes.ENUM('Incoming', 'Outgoing'),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    outcome: {
      type: DataTypes.STRING,
      allowNull: true
    },
    followUpNeeded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    followUpDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    followUpCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    litterId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Litters',
        key: 'id'
      },
      comment: 'If this interaction pertains to a specific litter'
    },
    dogId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Dogs',
        key: 'id'
      },
      comment: 'If this interaction pertains to a specific dog'
    },
    emailMessageId: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'If this is an email, the message ID for threading'
    },
    attachmentCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    documentIds: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
      comment: 'IDs of related documents'
    }
  }, {
    timestamps: true
  });

  ContactInteraction.associate = (models) => {
    // An interaction belongs to a contact
    ContactInteraction.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      as: 'contact'
    });

    // An interaction belongs to a breeder
    ContactInteraction.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // An interaction may be related to a litter
    ContactInteraction.belongsTo(models.Litter, {
      foreignKey: 'litterId',
      as: 'litter'
    });

    // An interaction may be related to a dog
    ContactInteraction.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });
  };

  return ContactInteraction;
};
