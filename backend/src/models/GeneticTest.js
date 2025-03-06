module.exports = (sequelize, DataTypes) => {
  const GeneticTest = sequelize.define('GeneticTest', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    dogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Dogs',
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
    testName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name of the genetic test'
    },
    testDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    testProvider: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Lab or genetic testing company'
    },
    testResult: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Result of the test (Clear, Carrier, Affected, etc.)'
    },
    resultDetails: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    testCertificateNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    documentId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'Reference to uploaded document with test results'
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Whether this test result is displayed publicly'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    geneticMarker: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Specific gene or marker being tested'
    },
    inheritancePattern: {
      type: DataTypes.ENUM('Autosomal Dominant', 'Autosomal Recessive', 'X-linked', 'Other', 'Unknown'),
      allowNull: true
    },
    breedRelevance: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Description of how this test is relevant to the breed'
    },
    isBreedSpecificRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this test is required for this breed'
    },
    expirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: 'If the test certification expires'
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  }, {
    timestamps: true
  });

  GeneticTest.associate = (models) => {
    // A genetic test belongs to a dog
    GeneticTest.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });

    // A genetic test belongs to a breeder
    GeneticTest.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A genetic test may have a document
    GeneticTest.belongsTo(models.Document, {
      foreignKey: 'documentId',
      as: 'document'
    });
  };

  return GeneticTest;
};
