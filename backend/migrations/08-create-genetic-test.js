'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GeneticTests', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      dogId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Dogs',
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
      testName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      testDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: true
      },
      results: {
        type: Sequelize.STRING,
        allowNull: true
      },
      resultDetails: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Completed', 'Failed', 'Cancelled'),
        defaultValue: 'Pending'
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      documentId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      geneticMarker: {
        type: Sequelize.STRING,
        allowNull: true
      },
      affectedCondition: {
        type: Sequelize.STRING,
        allowNull: true
      },
      interpretation: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      notes: {
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
    await queryInterface.addIndex('GeneticTests', ['dogId']);
    await queryInterface.addIndex('GeneticTests', ['breederId']);
    await queryInterface.addIndex('GeneticTests', ['testName']);
    await queryInterface.addIndex('GeneticTests', ['testDate']);
    await queryInterface.addIndex('GeneticTests', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('GeneticTests');
  }
};
