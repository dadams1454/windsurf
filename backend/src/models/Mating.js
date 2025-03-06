module.exports = (sequelize, DataTypes) => {
  const Mating = sequelize.define('Mating', {
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
    sireId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Dogs',
        key: 'id'
      }
    },
    damId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Dogs',
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    matingMethod: {
      type: DataTypes.ENUM('Natural', 'Artificial Insemination', 'Surgical Implant'),
      allowNull: false,
      defaultValue: 'Natural'
    },
    status: {
      type: DataTypes.ENUM(
        'Planned', 
        'In Progress', 
        'Completed', 
        'Confirmed Pregnant', 
        'Not Pregnant', 
        'Cancelled'
      ),
      defaultValue: 'Planned'
    },
    successfulTie: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    semenCollectionDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    semenType: {
      type: DataTypes.ENUM('Fresh', 'Chilled', 'Frozen'),
      allowNull: true
    },
    semenStorageFacility: {
      type: DataTypes.STRING,
      allowNull: true
    },
    inseminationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    inseminationPerformedBy: {
      type: DataTypes.STRING,
      allowNull: true
    },
    progesteroneTestingDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    progesteroneResults: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ultrasoundDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ultrasoundResults: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    xrayDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    estimatedPuppyCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    plannedBreedingGoals: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    feePaid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'If using outside stud, fee paid for service'
    },
    studContract: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Documents',
        key: 'id'
      }
    },
    calculatedCOI: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Calculated coefficient of inbreeding for this pairing'
    },
    expectedColors: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    expectedTraits: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  Mating.associate = (models) => {
    // A mating belongs to a breeder
    Mating.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A mating involves a sire
    Mating.belongsTo(models.Dog, {
      foreignKey: 'sireId',
      as: 'sire'
    });

    // A mating involves a dam
    Mating.belongsTo(models.Dog, {
      foreignKey: 'damId',
      as: 'dam'
    });

    // A mating may result in litters
    Mating.hasMany(models.Litter, {
      foreignKey: 'matingId',
      as: 'litters'
    });

    // A mating may have documents
    Mating.belongsTo(models.Document, {
      foreignKey: 'studContract',
      as: 'contract'
    });
  };

  return Mating;
};
