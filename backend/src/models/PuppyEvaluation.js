module.exports = (sequelize, DataTypes) => {
  const PuppyEvaluation = sequelize.define('PuppyEvaluation', {
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
    evaluationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Age of the puppy at evaluation (e.g., "8 weeks")'
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Weight in pounds or kilograms'
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Height in inches or centimeters'
    },
    evaluatorName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    temperamentNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    structureNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    overallRating: {
      type: DataTypes.ENUM('Excellent', 'Very Good', 'Good', 'Fair', 'Poor'),
      allowNull: true
    },
    showPotential: {
      type: DataTypes.ENUM('Excellent', 'Very Good', 'Good', 'Fair', 'Poor', 'None'),
      allowNull: true
    },
    breedingPotential: {
      type: DataTypes.ENUM('Excellent', 'Very Good', 'Good', 'Fair', 'Poor', 'None'),
      allowNull: true
    },
    temperamentRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      },
      comment: 'Rating from 1-10'
    },
    structureRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      },
      comment: 'Rating from 1-10'
    },
    movementRating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      },
      comment: 'Rating from 1-10'
    },
    biteAlignment: {
      type: DataTypes.ENUM('Correct', 'Scissor', 'Level', 'Undershot', 'Overshot', 'Other'),
      allowNull: true
    },
    dentitionNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    structuralFaults: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    structuralStrengths: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    colorAndMarkings: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coatQuality: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    evaluationMethod: {
      type: DataTypes.ENUM('Volhard', 'Standard', 'Custom', 'Other'),
      defaultValue: 'Standard'
    },
    detailedScores: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Detailed scoring from standardized evaluation method'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    recommendedHome: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Type of home recommended for this puppy'
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    documentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Documents',
        key: 'id'
      }
    },
    isSharedWithBuyers: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true
  });

  PuppyEvaluation.associate = (models) => {
    // An evaluation belongs to a dog
    PuppyEvaluation.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });

    // An evaluation belongs to a breeder
    PuppyEvaluation.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // An evaluation may have a document
    PuppyEvaluation.belongsTo(models.Document, {
      foreignKey: 'documentId',
      as: 'document'
    });
  };

  return PuppyEvaluation;
};
