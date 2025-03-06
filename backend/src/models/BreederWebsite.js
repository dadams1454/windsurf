module.exports = (sequelize, DataTypes) => {
  const BreederWebsite = sequelize.define('BreederWebsite', {
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
    subdomain: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      comment: 'Subdomain for the breeder website (e.g., example.dogbreederapp.com)'
    },
    customDomain: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      comment: 'Custom domain if the breeder has one'
    },
    siteName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'My Kennel Website'
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'URL to the kennel logo'
    },
    primaryColor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '#4A90E2',
      comment: 'Primary color for the website theme'
    },
    secondaryColor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '#50E3C2',
      comment: 'Secondary color for the website theme'
    },
    backgroundColor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '#FFFFFF',
      comment: 'Background color for the website'
    },
    fontFamily: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Roboto, sans-serif'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metaKeywords: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleAnalyticsId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebookPixelId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    aboutContent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    welcomeMessage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    footerText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    showAvailablePuppies: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    showUpcomingLitters: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    showAdultDogs: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    showTestimonials: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    showContactForm: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    showPricing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    allowReservations: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether to allow online reservations through the website'
    },
    reservationDepositAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    socialFacebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    socialInstagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    socialTwitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    socialYoutube: {
      type: DataTypes.STRING,
      allowNull: true
    },
    headerImageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    faviconUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    templateId: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'default',
      comment: 'Which website template to use'
    },
    customCss: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    customHtml: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    customScripts: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  BreederWebsite.associate = (models) => {
    // A website belongs to a breeder
    BreederWebsite.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A website can have many testimonials
    BreederWebsite.hasMany(models.Testimonial, {
      foreignKey: 'websiteId',
      as: 'testimonials'
    });

    // A website can have many pages
    BreederWebsite.hasMany(models.WebsitePage, {
      foreignKey: 'websiteId',
      as: 'pages'
    });
  };

  return BreederWebsite;
};
