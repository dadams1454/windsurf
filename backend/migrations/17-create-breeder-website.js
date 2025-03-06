'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BreederWebsites', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      breederId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      siteName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      subdomain: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bannerImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      themeColor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accentColor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fontFamily: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      publishedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive', 'Maintenance', 'Building'),
        defaultValue: 'Building'
      },
      template: {
        type: Sequelize.STRING,
        allowNull: true
      },
      contactEmail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      contactPhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      showLocation: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      facebookUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      instagramUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      youtubeUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      twitterUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      googleAnalyticsId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      customCss: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      customJs: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      metaTags: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      settings: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      showTestimonials: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      showAvailablePuppies: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      showUpcomingLitters: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      showAdultDogs: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Add indexes
    await queryInterface.addIndex('BreederWebsites', ['breederId']);
    await queryInterface.addIndex('BreederWebsites', ['subdomain']);
    await queryInterface.addIndex('BreederWebsites', ['domain']);
    await queryInterface.addIndex('BreederWebsites', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BreederWebsites');
  }
};
