'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PuppyEvaluations', {
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
      evaluationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      age: {
        type: Sequelize.STRING,
        allowNull: true
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      evaluatorName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      temperamentNotes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      structureNotes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      overallRating: {
        type: Sequelize.ENUM('Excellent', 'Very Good', 'Good', 'Fair', 'Poor'),
        allowNull: true
      },
      showPotential: {
        type: Sequelize.ENUM('Excellent', 'Very Good', 'Good', 'Fair', 'Poor', 'None'),
        allowNull: true
      },
      breedingPotential: {
        type: Sequelize.ENUM('Excellent', 'Very Good', 'Good', 'Fair', 'Poor', 'None'),
        allowNull: true
      },
      temperamentRating: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      structureRating: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      movementRating: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      biteAlignment: {
        type: Sequelize.ENUM('Correct', 'Scissor', 'Level', 'Undershot', 'Overshot', 'Other'),
        allowNull: true
      },
      dentitionNotes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      structuralFaults: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      structuralStrengths: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      colorAndMarkings: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      coatQuality: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      evaluationMethod: {
        type: Sequelize.ENUM('Volhard', 'Standard', 'Custom', 'Other'),
        defaultValue: 'Standard'
      },
      detailedScores: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      recommendedHome: {
        type: Sequelize.STRING,
        allowNull: true
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
      isSharedWithBuyers: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.addIndex('PuppyEvaluations', ['dogId']);
    await queryInterface.addIndex('PuppyEvaluations', ['breederId']);
    await queryInterface.addIndex('PuppyEvaluations', ['evaluationDate']);
    await queryInterface.addIndex('PuppyEvaluations', ['overallRating']);
    await queryInterface.addIndex('PuppyEvaluations', ['showPotential']);
    await queryInterface.addIndex('PuppyEvaluations', ['breedingPotential']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PuppyEvaluations');
  }
};
