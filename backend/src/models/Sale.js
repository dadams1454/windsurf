module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
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
    dogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Dogs',
        key: 'id'
      }
    },
    buyerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Contacts',
        key: 'id'
      }
    },
    reservationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Reservations',
        key: 'id'
      }
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    salePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    depositAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'Amount already paid as deposit'
    },
    balanceDue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    balancePaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    balancePaidDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    includesRegistration: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    registrationType: {
      type: DataTypes.ENUM('Full', 'Limited', 'None'),
      defaultValue: 'Limited'
    },
    includesSpayNeuterAgreement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    includesHealthGuarantee: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    healthGuaranteeDuration: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(
        'Pending', 
        'Completed', 
        'Cancelled', 
        'Refunded'
      ),
      defaultValue: 'Pending'
    },
    pickupDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    isPickedUp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    actualPickupDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    microchipTransferred: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    registrationTransferred: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    registrationTransferDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    contractSigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    contractSignedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    salesContractId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'Reference to the signed sales contract document'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    followUpScheduled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    followUpDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    salesTax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    taxRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    additionalItems: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Additional items included in sale (food, supplies, etc.)'
    },
    isBlockchainRecorded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this sale has been recorded on the blockchain'
    },
    blockchainTransactionId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  Sale.associate = (models) => {
    // A sale belongs to a breeder
    Sale.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A sale is for a specific dog
    Sale.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });

    // A sale is to a specific buyer
    Sale.belongsTo(models.Contact, {
      foreignKey: 'buyerId',
      as: 'buyer'
    });

    // A sale may come from a reservation
    Sale.belongsTo(models.Reservation, {
      foreignKey: 'reservationId',
      as: 'reservation'
    });

    // A sale may have many transactions
    Sale.hasMany(models.Transaction, {
      foreignKey: 'saleId',
      as: 'transactions'
    });

    // A sale may have multiple documents
    Sale.hasMany(models.Document, {
      foreignKey: 'saleId',
      as: 'documents'
    });
  };

  return Sale;
};
