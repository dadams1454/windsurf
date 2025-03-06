'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WebsitePages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      websiteId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'BreederWebsites',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      metaTitle: {
        type: Sequelize.STRING,
        allowNull: true
      },
      metaDescription: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      featuredImage: {
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
        type: Sequelize.ENUM('Draft', 'Published', 'Archived'),
        defaultValue: 'Draft'
      },
      pageType: {
        type: Sequelize.ENUM(
          'Home', 
          'About', 
          'Contact', 
          'Puppies', 
          'Adults', 
          'Gallery', 
          'Testimonials', 
          'FAQ', 
          'Custom'
        ),
        defaultValue: 'Custom'
      },
      isInMenu: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      menuOrder: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      parentId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'WebsitePages',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      template: {
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
    await queryInterface.addIndex('WebsitePages', ['websiteId']);
    await queryInterface.addIndex('WebsitePages', ['breederId']);
    await queryInterface.addIndex('WebsitePages', ['slug']);
    await queryInterface.addIndex('WebsitePages', ['isPublished']);
    await queryInterface.addIndex('WebsitePages', ['pageType']);
    await queryInterface.addIndex('WebsitePages', ['parentId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('WebsitePages');
  }
};
