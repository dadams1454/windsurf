module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phone: {
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
    contactType: {
      type: DataTypes.ENUM('Buyer', 'Potential Buyer', 'Breeder', 'Vendor', 'Veterinarian', 'Other'),
      defaultValue: 'Potential Buyer'
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Lead', 'Customer', 'VIP', 'Blacklisted'),
      defaultValue: 'Lead'
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'How did this contact find out about the breeder'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    breedPreferences: {
      type: DataTypes.STRING,
      allowNull: true
    },
    colorPreferences: {
      type: DataTypes.STRING,
      allowNull: true
    },
    genderPreference: {
      type: DataTypes.ENUM('Male', 'Female', 'No Preference'),
      allowNull: true,
      defaultValue: 'No Preference'
    },
    timeframe: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'When the contact is looking to get a puppy'
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    hasChildren: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    hasOtherPets: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    homeType: {
      type: DataTypes.ENUM('House', 'Apartment', 'Farm', 'Other'),
      allowNull: true
    },
    yard: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Previous dog ownership experience'
    },
    leadScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: 'Calculated score representing this contact\'s likelihood to purchase'
    },
    lastContactDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    marketingConsent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this contact has consented to receive marketing communications'
    },
    consentDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    consentIpAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'IP address when consent was given (for GDPR compliance)'
    },
    additionalData: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Any additional custom fields'
    }
  }, {
    timestamps: true
  });

  Contact.associate = (models) => {
    // A contact belongs to a breeder
    Contact.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A contact can have many interactions
    Contact.hasMany(models.ContactInteraction, {
      foreignKey: 'contactId',
      as: 'interactions'
    });

    // A contact can have many reservations
    Contact.hasMany(models.Reservation, {
      foreignKey: 'contactId',
      as: 'reservations'
    });

    // A contact can have many sales
    Contact.hasMany(models.Sale, {
      foreignKey: 'buyerId',
      as: 'purchases'
    });

    // A contact can be waitlisted for multiple breeds/litters
    Contact.hasMany(models.Waitlist, {
      foreignKey: 'contactId',
      as: 'waitlistEntries'
    });
  };

  return Contact;
};
