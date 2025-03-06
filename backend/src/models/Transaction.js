module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
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
    saleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Sales',
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
    contactId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Contacts',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Deposit', 'Payment', 'Refund', 'Fee', 'Other'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Failed', 'Disputed', 'Refunded'),
      defaultValue: 'Pending'
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Cash, Credit Card, PayPal, Venmo, Zelle, etc.'
    },
    transactionReference: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Payment processor reference ID or receipt number'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    receiptSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    receiptSentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    stripeChargeId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paypalTransactionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    processingFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
      comment: 'Fee charged by payment processor'
    },
    isManual: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this transaction was entered manually vs. through payment processor'
    },
    documentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Documents',
        key: 'id'
      },
      comment: 'Receipt document'
    }
  }, {
    timestamps: true
  });

  Transaction.associate = (models) => {
    // A transaction belongs to a breeder
    Transaction.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A transaction may be related to a sale
    Transaction.belongsTo(models.Sale, {
      foreignKey: 'saleId',
      as: 'sale'
    });

    // A transaction may be related to a reservation
    Transaction.belongsTo(models.Reservation, {
      foreignKey: 'reservationId',
      as: 'reservation'
    });

    // A transaction may be related to a contact
    Transaction.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      as: 'contact'
    });

    // A transaction may have a receipt document
    Transaction.belongsTo(models.Document, {
      foreignKey: 'documentId',
      as: 'receipt'
    });
  };

  return Transaction;
};
