module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
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
      }
    },
    litterId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Litters',
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
    contactId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Contacts',
        key: 'id'
      }
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'MIME type of the file'
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Size in bytes'
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'S3 or storage URL'
    },
    documentType: {
      type: DataTypes.ENUM(
        'Contract', 
        'Health Certificate', 
        'Pedigree', 
        'Registration', 
        'Transfer', 
        'Genetic Test', 
        'Vaccination', 
        'Receipt', 
        'Invoice', 
        'Image', 
        'Other'
      ),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uploadDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this document is shared with puppy buyers or publicly'
    },
    isSignatureRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    signatureStatus: {
      type: DataTypes.ENUM('Not Required', 'Pending', 'Signed', 'Rejected'),
      defaultValue: 'Not Required'
    },
    signedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    signedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  Document.associate = (models) => {
    // A document belongs to a breeder
    Document.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A document may be related to a dog
    Document.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });

    // A document may be related to a litter
    Document.belongsTo(models.Litter, {
      foreignKey: 'litterId',
      as: 'litter'
    });

    // A document may be related to a sale
    Document.belongsTo(models.Sale, {
      foreignKey: 'saleId',
      as: 'sale'
    });

    // A document may be related to a contact
    Document.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      as: 'contact'
    });

    // A document can be referenced by health records
    Document.hasMany(models.HealthRecord, {
      foreignKey: 'documentId',
      as: 'healthRecords'
    });

    // A document can be referenced by genetic tests
    Document.hasMany(models.GeneticTest, {
      foreignKey: 'documentId',
      as: 'geneticTests'
    });

    // A document can be referenced by financial records
    Document.hasMany(models.FinancialRecord, {
      foreignKey: 'receiptDocumentId',
      as: 'financialRecords'
    });
  };

  return Document;
};
