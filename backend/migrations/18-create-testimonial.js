'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Testimonials', {
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
      contactId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Contacts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      dogId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Dogs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerLocation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 5
        }
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isDisplayed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      approvedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      displayOrder: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      dogPicture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      customerPicture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Where the testimonial originated (email, website, etc.)'
      },
      websiteId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'BreederWebsites',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.addIndex('Testimonials', ['breederId']);
    await queryInterface.addIndex('Testimonials', ['contactId']);
    await queryInterface.addIndex('Testimonials', ['dogId']);
    await queryInterface.addIndex('Testimonials', ['isApproved']);
    await queryInterface.addIndex('Testimonials', ['isDisplayed']);
    await queryInterface.addIndex('Testimonials', ['websiteId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Testimonials');
  }
};
