module.exports = (sequelize, DataTypes) => {
  const Pedigree = sequelize.define('Pedigree', {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Standard Pedigree'
    },
    generationCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 4,
      comment: 'Number of generations in this pedigree (typically 3-5)'
    },
    pedigreeData: {
      type: DataTypes.JSONB,
      allowNull: false,
      comment: 'Structured data representing the pedigree tree'
    },
    coefficientOfInbreeding: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Calculated inbreeding coefficient (0.0-1.0)'
    },
    avgCoefficient: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Average COI across the pedigree'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this pedigree has been verified against registry data'
    },
    verifiedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    verifiedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    registrySource: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Source registry for this pedigree data (AKC, UKC, etc.)'
    },
    lastCalculated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    healthAnalysisData: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Analysis of health conditions/traits across the pedigree'
    },
    colorAnalysisData: {
      type: DataTypes.JSONB, 
      allowNull: true,
      comment: 'Analysis of color distribution and genetics'
    },
    documentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Documents',
        key: 'id'
      },
      comment: 'PDF or other document with the formal pedigree'
    },
    lastModified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true
  });

  Pedigree.associate = (models) => {
    // A pedigree belongs to a dog
    Pedigree.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });

    // A pedigree belongs to a breeder
    Pedigree.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A pedigree may have a document
    Pedigree.belongsTo(models.Document, {
      foreignKey: 'documentId',
      as: 'document'
    });
  };

  return Pedigree;
};
