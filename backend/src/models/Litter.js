module.exports = (sequelize, DataTypes) => {
  const Litter = sequelize.define('Litter', {
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
    litterName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    breedingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    whelpsDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    registrationNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    totalPuppies: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maleCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    femaleCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    stillbornCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    liveCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM(
        'Planned', 
        'Confirmed', 
        'Pregnant', 
        'Whelping', 
        'Weaning', 
        'Available', 
        'Sold', 
        'Archived'
      ),
      defaultValue: 'Planned'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    calculatedCOI: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Calculated inbreeding coefficient for the litter'
    },
    plannedBreedingGoals: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    weaningDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    availableDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this litter should be displayed on the public website'
    },
    marketingDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Public description for marketing this litter'
    },
    litterPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'Base price for puppies in this litter'
    },
    coverPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'URL to the main litter photo'
    },
    expectedTraits: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Expected traits from this pairing'
    }
  }, {
    timestamps: true
  });

  Litter.associate = (models) => {
    // A litter belongs to a breeder
    Litter.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A litter belongs to a sire
    Litter.belongsTo(models.Dog, {
      foreignKey: 'sireId',
      as: 'sire'
    });

    // A litter belongs to a dam
    Litter.belongsTo(models.Dog, {
      foreignKey: 'damId',
      as: 'dam'
    });

    // A litter has many puppies
    Litter.hasMany(models.Dog, {
      foreignKey: 'litterId',
      as: 'puppies'
    });

    // A litter can have many reservations
    Litter.hasMany(models.Reservation, {
      foreignKey: 'litterId',
      as: 'reservations'
    });

    // A litter can have many expenses/income records
    Litter.hasMany(models.FinancialRecord, {
      foreignKey: 'litterId',
      as: 'financialRecords'
    });

    // A litter can have many photos
    Litter.hasMany(models.LitterPhoto, {
      foreignKey: 'litterId',
      as: 'photos'
    });

    // A litter can have many updates/notes
    Litter.hasMany(models.LitterUpdate, {
      foreignKey: 'litterId',
      as: 'updates'
    });

    // A litter may be related to a mating
    Litter.belongsTo(models.Mating, {
      foreignKey: 'matingId',
      as: 'mating'
    });
  };

  return Litter;
};
