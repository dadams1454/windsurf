'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HealthRecords', {
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
      type: {
        type: Sequelize.ENUM(
          'Vaccination', 
          'Deworming', 
          'Medication', 
          'Surgery', 
          'Examination', 
          'Test', 
          'Injury', 
          'Illness', 
          'Allergy', 
          'Weight', 
          'Other'
        ),
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: true
      },
      medications: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dosage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      results: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      followUpNeeded: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      followUpDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      documentId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      temperature: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      isVaccineBoosterNeeded: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      vaccineBoosterDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      isSharedWithBuyers: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      vaccineScheduleId: {
        type: Sequelize.UUID,
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
    await queryInterface.addIndex('HealthRecords', ['dogId']);
    await queryInterface.addIndex('HealthRecords', ['breederId']);
    await queryInterface.addIndex('HealthRecords', ['type']);
    await queryInterface.addIndex('HealthRecords', ['date']);
    await queryInterface.addIndex('HealthRecords', ['vaccineScheduleId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HealthRecords');
  }
};
