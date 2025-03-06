'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Documents', {
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
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      filePath: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fileType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fileSize: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      documentType: {
        type: Sequelize.ENUM(
          'Contract', 
          'Pedigree', 
          'Registration', 
          'Health Certificate', 
          'Genetic Test', 
          'Veterinary Record', 
          'Invoice', 
          'Receipt', 
          'Photo', 
          'Other'
        ),
        defaultValue: 'Other'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      uploadDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      relatedEntityType: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Type of entity this document is related to (Dog, Litter, Sale, etc.)'
      },
      relatedEntityId: {
        type: Sequelize.UUID,
        allowNull: true,
        comment: 'ID of the entity this document is related to'
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      expirationDate: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.addIndex('Documents', ['breederId']);
    await queryInterface.addIndex('Documents', ['documentType']);
    await queryInterface.addIndex('Documents', ['relatedEntityType', 'relatedEntityId']);
    await queryInterface.addIndex('Documents', ['uploadDate']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Documents');
  }
};
