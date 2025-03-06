'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContactInteractions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      contactId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Contacts',
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
      interactionDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      type: {
        type: Sequelize.ENUM(
          'Email', 
          'Phone', 
          'In-Person', 
          'Text', 
          'Video Call', 
          'Social Media', 
          'Website', 
          'Other'
        ),
        defaultValue: 'Email'
      },
      direction: {
        type: Sequelize.ENUM('Incoming', 'Outgoing'),
        defaultValue: 'Incoming'
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      followUpRequired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      followUpDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('New', 'Read', 'Replied', 'Closed', 'Flagged'),
        defaultValue: 'New'
      },
      isResolved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      resolvedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      isImportant: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      relatedEntityType: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Type of entity this interaction is related to (Dog, Litter, etc.)'
      },
      relatedEntityId: {
        type: Sequelize.UUID,
        allowNull: true,
        comment: 'ID of the entity this interaction is related to'
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
    await queryInterface.addIndex('ContactInteractions', ['contactId']);
    await queryInterface.addIndex('ContactInteractions', ['breederId']);
    await queryInterface.addIndex('ContactInteractions', ['interactionDate']);
    await queryInterface.addIndex('ContactInteractions', ['type']);
    await queryInterface.addIndex('ContactInteractions', ['status']);
    await queryInterface.addIndex('ContactInteractions', ['followUpDate']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ContactInteractions');
  }
};
