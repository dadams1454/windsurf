'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pedigrees', {
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
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Standard Pedigree'
      },
      generationCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 4
      },
      pedigreeData: {
        type: Sequelize.JSONB,
        allowNull: false
      },
      coefficientOfInbreeding: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      avgCoefficient: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      verifiedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      verifiedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      registrySource: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastCalculated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      healthAnalysisData: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      colorAnalysisData: {
        type: Sequelize.JSONB, 
        allowNull: true
      },
      documentId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Documents',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      lastModified: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
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
    await queryInterface.addIndex('Pedigrees', ['dogId']);
    await queryInterface.addIndex('Pedigrees', ['breederId']);
    await queryInterface.addIndex('Pedigrees', ['isPublic']);
    await queryInterface.addIndex('Pedigrees', ['isVerified']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pedigrees');
  }
};
