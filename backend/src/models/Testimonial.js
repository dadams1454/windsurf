module.exports = (sequelize, DataTypes) => {
  const Testimonial = sequelize.define('Testimonial', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    websiteId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'BreederWebsites',
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
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerLocation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      },
      comment: 'Rating from 1-5 stars'
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDisplayed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Customer photo URL'
    },
    dogId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Dogs',
        key: 'id'
      },
      comment: 'If this testimonial is about a specific dog'
    },
    originalSource: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Where the testimonial came from (e.g., Google, Facebook, Direct)'
    },
    verificationMethod: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'How the testimonial was verified'
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    timestamps: true
  });

  Testimonial.associate = (models) => {
    // A testimonial belongs to a website
    Testimonial.belongsTo(models.BreederWebsite, {
      foreignKey: 'websiteId',
      as: 'website'
    });

    // A testimonial belongs to a breeder
    Testimonial.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A testimonial may be about a specific dog
    Testimonial.belongsTo(models.Dog, {
      foreignKey: 'dogId',
      as: 'dog'
    });
  };

  return Testimonial;
};
