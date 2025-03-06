module.exports = (sequelize, DataTypes) => {
  const WebsitePage = sequelize.define('WebsitePage', {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'URL-friendly version of the title'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isInMenu: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Whether to include this page in the website navigation menu'
    },
    menuOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    pageType: {
      type: DataTypes.ENUM('Standard', 'Blog', 'Gallery', 'Contact', 'Special'),
      defaultValue: 'Standard'
    },
    layout: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'default',
      comment: 'The layout template to use for this page'
    },
    headerImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Header/banner image for this page'
    },
    showInFooter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    requiresLogin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this page requires user login (e.g., puppy owner portal)'
    },
    lastModified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    customCss: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Custom CSS specific to this page'
    },
    customJs: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Custom JavaScript specific to this page'
    },
    parentPageId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'WebsitePages',
        key: 'id'
      },
      comment: 'If this is a subpage, the ID of the parent page'
    }
  }, {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['websiteId', 'slug']
      }
    ]
  });

  WebsitePage.associate = (models) => {
    // A page belongs to a website
    WebsitePage.belongsTo(models.BreederWebsite, {
      foreignKey: 'websiteId',
      as: 'website'
    });

    // A page belongs to a breeder
    WebsitePage.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // Parent-child relationship between pages
    WebsitePage.belongsTo(models.WebsitePage, {
      foreignKey: 'parentPageId',
      as: 'parentPage'
    });

    WebsitePage.hasMany(models.WebsitePage, {
      foreignKey: 'parentPageId',
      as: 'childPages'
    });
  };

  return WebsitePage;
};
