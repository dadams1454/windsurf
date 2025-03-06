module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
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
    contractType: {
      type: DataTypes.ENUM('Sales', 'Co-Ownership', 'Stud Service', 'Breeding Rights', 'Other'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isTemplate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this is a template or an actual contract'
    },
    status: {
      type: DataTypes.ENUM('Draft', 'Sent', 'Signed', 'Expired', 'Cancelled', 'Completed'),
      defaultValue: 'Draft'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    effectiveDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    expirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    documentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Documents',
        key: 'id'
      },
      comment: 'Reference to the signed contract document'
    },
    contactId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Contacts',
        key: 'id'
      },
      comment: 'If this contract is with a specific contact'
    },
    dogId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Dogs',
        key: 'id'
      },
      comment: 'If this contract is for a specific dog'
    },
    saleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Sales',
        key: 'id'
      },
      comment: 'If this contract is related to a sale'
    },
    signatureRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    signedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    signedById: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'Who signed this contract'
    },
    signedByType: {
      type: DataTypes.ENUM('User', 'Contact'),
      allowNull: true
    },
    signatureIpAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    templateVariables: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Variables that can be used in template substitution'
    },
    lastModified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true
  });

  Contract.associate = (models) => {
    // A contract belongs to a breeder
    Contract.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A contract may be related to a document
    Contract.belongsTo(models.Document, {
      foreignKey: 'documentId',
      as: 'document'
    });

    // A contract may be with a contact
    Contract.belongsTo(models.Contact, {
      foreignKey: 'contactId',
      as: 'contact'
    });

    // A contract may be for a dog
    Contract.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });

    // A contract may be related to a sale
    Contract.belongsTo(models.Sale, {
      foreignKey: 'saleId',
      as: 'sale'
    });
  };

  return Contract;
};
