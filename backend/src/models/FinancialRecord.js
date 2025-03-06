module.exports = (sequelize, DataTypes) => {
  const FinancialRecord = sequelize.define('FinancialRecord', {
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
      allowNull: true,
      references: {
        model: 'Dogs',
        key: 'id'
      },
      comment: 'If the expense/income is related to a specific dog'
    },
    litterId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Litters',
        key: 'id'
      },
      comment: 'If the expense/income is related to a specific litter'
    },
    saleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Sales',
        key: 'id'
      },
      comment: 'If the income is from a specific sale'
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Income', 'Expense'),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Food, Vet Care, Supplies, Puppy Sales, Stud Service, etc.'
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Receipt number, invoice number, etc.'
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Where the expense was incurred or who the income came from'
    },
    isTaxDeductible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    taxCategory: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Category for tax reporting purposes'
    },
    receiptDocumentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Documents',
        key: 'id'
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isRecurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    recurringFrequency: {
      type: DataTypes.ENUM('Weekly', 'Monthly', 'Quarterly', 'Yearly'),
      allowNull: true
    },
    recordedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Person who recorded this transaction if different from breeder'
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Reconciled'),
      defaultValue: 'Completed'
    }
  }, {
    timestamps: true
  });

  FinancialRecord.associate = (models) => {
    // A financial record belongs to a breeder
    FinancialRecord.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A financial record may be related to a dog
    FinancialRecord.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });

    // A financial record may be related to a litter
    FinancialRecord.belongsTo(models.Litter, {
      foreignKey: 'litterId',
      as: 'litter'
    });

    // A financial record may be related to a sale
    FinancialRecord.belongsTo(models.Sale, {
      foreignKey: 'saleId',
      as: 'sale'
    });

    // A financial record may have a receipt document
    FinancialRecord.belongsTo(models.Document, {
      foreignKey: 'receiptDocumentId',
      as: 'receipt'
    });
  };

  return FinancialRecord;
};
