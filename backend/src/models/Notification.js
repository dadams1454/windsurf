module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
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
    recipientId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'User ID if notification is for a user, or Contact ID if for a client'
    },
    recipientType: {
      type: DataTypes.ENUM('User', 'Contact'),
      allowNull: false,
      defaultValue: 'User'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(
        'System', 
        'LitterUpdate', 
        'PuppyMilestone', 
        'PaymentReceived', 
        'ReservationRequest', 
        'HealthReminder', 
        'TaskDue', 
        'Message', 
        'Other'
      ),
      defaultValue: 'System'
    },
    status: {
      type: DataTypes.ENUM('Unread', 'Read', 'Archived'),
      defaultValue: 'Unread'
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Normal', 'High', 'Urgent'),
      defaultValue: 'Normal'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isEmailSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isSMSSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    emailSentAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    smsSentAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    targetUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'URL to redirect to when notification is clicked'
    },
    relatedEntityType: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Type of entity this notification is related to (Dog, Litter, Sale, etc.)'
    },
    relatedEntityId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'ID of the entity this notification is related to'
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Any additional data to include with the notification'
    }
  }, {
    timestamps: true,
    updatedAt: false
  });

  Notification.associate = (models) => {
    // A notification belongs to a breeder
    Notification.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A notification may be for a user
    Notification.belongsTo(models.User, {
      foreignKey: 'recipientId',
      as: 'userRecipient',
      constraints: false,
      scope: {
        recipientType: 'User'
      }
    });

    // A notification may be for a contact
    Notification.belongsTo(models.Contact, {
      foreignKey: 'recipientId',
      as: 'contactRecipient',
      constraints: false,
      scope: {
        recipientType: 'Contact'
      }
    });
  };

  return Notification;
};
