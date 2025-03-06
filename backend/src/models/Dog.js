module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
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
    registeredName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    callName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    registrationNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    microchipNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    markings: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female'),
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM(
        'Active', 
        'Breeding', 
        'Retired', 
        'Sold', 
        'Available', 
        'Reserved', 
        'Deceased'
      ),
      defaultValue: 'Active'
    },
    isOwnBred: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    acquiredFrom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    acquiredDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    dna: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profilePhoto: {
      type: DataTypes.STRING, // URL to photo
      allowNull: true
    },
    pedigreeCoefficient: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Calculated inbreeding coefficient'
    },
    titleAchievements: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    privateDogData: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Store any additional data that should not be publicly visible'
    },
    publicDogData: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Store any additional data that can be publicly displayed'
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this dog should be displayed on the public website'
    }
  }, {
    timestamps: true,
  });

  Dog.associate = (models) => {
    // A dog belongs to a breeder (user)
    Dog.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A dog can be in many litters as a sire
    Dog.hasMany(models.Litter, {
      foreignKey: 'sireId',
      as: 'siredLitters'
    });

    // A dog can be in many litters as a dam
    Dog.hasMany(models.Litter, {
      foreignKey: 'damId',
      as: 'motheredLitters'
    });

    // A dog can be in many matings
    Dog.hasMany(models.Mating, {
      foreignKey: 'sireId',
      as: 'sireMatings'
    });

    Dog.hasMany(models.Mating, {
      foreignKey: 'damId',
      as: 'damMatings'
    });

    // A dog can have many health records
    Dog.hasMany(models.HealthRecord, {
      foreignKey: 'dogId',
      as: 'healthRecords'
    });

    // A dog can have many genetic tests
    Dog.hasMany(models.GeneticTest, {
      foreignKey: 'dogId',
      as: 'geneticTests'
    });

    // Parent-child relationships for pedigree
    Dog.belongsTo(models.Dog, {
      foreignKey: 'sireId',
      as: 'sire'
    });

    Dog.belongsTo(models.Dog, {
      foreignKey: 'damId',
      as: 'dam'
    });

    // A dog can have many puppies (for tracking litter relationships)
    Dog.hasMany(models.Dog, {
      foreignKey: 'sireId',
      as: 'offspringAsSire'
    });

    Dog.hasMany(models.Dog, {
      foreignKey: 'damId',
      as: 'offspringAsDam'
    });

    // A dog can be sold
    Dog.hasOne(models.Sale, {
      foreignKey: 'dogId',
      as: 'sale'
    });

    // A dog can have many photos
    Dog.hasMany(models.DogPhoto, {
      foreignKey: 'dogId',
      as: 'photos'
    });
  };

  return Dog;
};
