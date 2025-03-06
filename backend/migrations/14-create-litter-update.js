'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LitterUpdates', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      litterId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Litters',
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
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      updateDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      puppyAge: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Age of puppies at time of update (e.g., "3 weeks")'
      },
      ageInDays: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      emailNotificationSent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      emailSentDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      milestone: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Special milestone being reported (e.g., "Eyes Open", "First Food")'
      },
      mediaUrls: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
    await queryInterface.addIndex('LitterUpdates', ['litterId']);
    await queryInterface.addIndex('LitterUpdates', ['breederId']);
    await queryInterface.addIndex('LitterUpdates', ['updateDate']);
    await queryInterface.addIndex('LitterUpdates', ['isPublished']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LitterUpdates');
  }
};
