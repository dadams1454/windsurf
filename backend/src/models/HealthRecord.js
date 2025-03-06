module.exports = (sequelize, DataTypes) => {
  const HealthRecord = sequelize.define('HealthRecord', {
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
    type: {
      type: DataTypes.ENUM(
        'Vaccination', 
        'Deworming', 
        'Medication', 
        'Surgery', 
        'Examination', 
        'Test', 
        'Injury', 
        'Illness', 
        'Allergy', 
        'Weight', 
        'Other'
      ),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Veterinarian or clinic name'
    },
    medications: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dosage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    results: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Results of tests or procedures'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    followUpNeeded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    followUpDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    documentId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'Reference to uploaded document like lab results'
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Weight at time of record'
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    isVaccineBoosterNeeded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    vaccineBoosterDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    isSharedWithBuyers: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this record is shared with puppy buyers'
    },
    vaccineScheduleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'VaccineSchedules',
        key: 'id'
      },
      comment: 'Reference to the vaccine schedule if this is a vaccination record'
    }
  }, {
    timestamps: true
  });

  HealthRecord.associate = (models) => {
    // A health record belongs to a dog
    HealthRecord.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });

    // A health record belongs to a breeder
    HealthRecord.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A health record may have a document
    HealthRecord.belongsTo(models.Document, {
      foreignKey: 'documentId',
      as: 'document'
    });
    
    // A health record may be related to a vaccine schedule
    HealthRecord.belongsTo(models.VaccineSchedule, {
      foreignKey: 'vaccineScheduleId',
      as: 'vaccineSchedule'
    });
  };

  return HealthRecord;
};
