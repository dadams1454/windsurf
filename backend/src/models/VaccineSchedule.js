module.exports = (sequelize, DataTypes) => {
  const VaccineSchedule = sequelize.define('VaccineSchedule', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Name of the vaccine'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    ageDue: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Age at which vaccine is due (e.g., "8 weeks")'
    },
    ageInWeeks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Age in weeks when vaccine is due'
    },
    isBoosterRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    boosterSchedule: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Description of booster schedule'
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    vaccineType: {
      type: DataTypes.ENUM('Core', 'Non-Core', 'Optional'),
      defaultValue: 'Core'
    },
    forPuppies: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    forAdults: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    adultFrequency: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'How often adult dogs should receive this vaccine (e.g., "yearly")'
    },
    reminderDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 7,
      comment: 'Days before due date to send reminder'
    }
  }, {
    timestamps: true
  });

  VaccineSchedule.associate = (models) => {
    // A vaccine schedule belongs to a breeder
    VaccineSchedule.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A vaccine schedule can have many health records
    VaccineSchedule.hasMany(models.HealthRecord, {
      foreignKey: 'vaccineScheduleId',
      as: 'healthRecords'
    });
  };

  return VaccineSchedule;
};
