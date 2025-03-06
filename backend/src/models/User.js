module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kennelName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kennelDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING, // URL to logo image
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'breeder', 'staff', 'guest'),
      defaultValue: 'breeder'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    subscriptionPlan: {
      type: DataTypes.ENUM('free', 'basic', 'premium', 'enterprise'),
      defaultValue: 'free'
    },
    subscriptionStatus: {
      type: DataTypes.ENUM('active', 'inactive', 'trial', 'expired'),
      defaultValue: 'trial'
    },
    subscriptionExpiry: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  User.associate = (models) => {
    // A user (breeder) can have many dogs
    User.hasMany(models.Dog, {
      foreignKey: 'breederId',
      as: 'dogs'
    });

    // A user can have many litters
    User.hasMany(models.Litter, {
      foreignKey: 'breederId',
      as: 'litters'
    });

    // A user can have many contacts/clients
    User.hasMany(models.Contact, {
      foreignKey: 'breederId',
      as: 'contacts'
    });

    // A user can have many financial records
    User.hasMany(models.FinancialRecord, {
      foreignKey: 'breederId',
      as: 'financialRecords'
    });

    // A user can have website settings
    User.hasOne(models.BreederWebsite, {
      foreignKey: 'breederId',
      as: 'website'
    });
  };

  return User;
};
