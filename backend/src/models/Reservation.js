module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
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
    litterId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Litters',
        key: 'id'
      },
      comment: 'If reservation is for a specific litter'
    },
    dogId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Dogs',
        key: 'id'
      },
      comment: 'If reservation is for a specific puppy'
    },
    reservationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM(
        'Pending', 
        'Confirmed', 
        'Waitlisted', 
        'Converted', 
        'Cancelled', 
        'Refunded'
      ),
      defaultValue: 'Pending'
    },
    depositAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    depositPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    depositMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
    depositDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    paymentReference: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Reference number or transaction ID for the deposit payment'
    },
    preferredGender: {
      type: DataTypes.ENUM('Male', 'Female', 'No Preference'),
      defaultValue: 'No Preference'
    },
    preferredColor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    preferredMarkings: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pickOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'The order in which this buyer gets to pick a puppy'
    },
    estimatedPickupDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isDepositNonRefundable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    termsAccepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    termsAcceptedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    agreedPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'The total agreed price for the puppy'
    },
    contractSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    contractSentDate: {
      type: DataTypes.DATE,
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
    documentId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'Reference to the signed contract document'
    }
  }, {
    timestamps: true
  });

  Reservation.associate = (models) => {
    // A reservation belongs to a breeder
    Reservation.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A reservation belongs to a contact (the potential buyer)
    Reservation.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      as: 'contact'
    });

    // A reservation may be for a specific litter
    Reservation.belongsTo(models.Litter, {
      foreignKey: 'litterId',
      as: 'litter'
    });

    // A reservation may be for a specific dog
    Reservation.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });

    // A reservation may convert to a sale
    Reservation.hasOne(models.Sale, {
      foreignKey: 'reservationId',
      as: 'sale'
    });

    // A reservation may have multiple payment transactions
    Reservation.hasMany(models.Transaction, {
      foreignKey: 'reservationId',
      as: 'transactions'
    });
  };

  return Reservation;
};
