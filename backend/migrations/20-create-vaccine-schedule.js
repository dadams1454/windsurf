'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VaccineSchedules', {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isRequired: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      ageDue: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ageInWeeks: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isBoosterRequired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      boosterSchedule: {
        type: Sequelize.STRING,
        allowNull: true
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      vaccineType: {
        type: Sequelize.ENUM('Core', 'Non-Core', 'Optional'),
        defaultValue: 'Core'
      },
      forPuppies: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      forAdults: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      adultFrequency: {
        type: Sequelize.STRING,
        allowNull: true
      },
      reminderDays: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 7
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
    await queryInterface.addIndex('VaccineSchedules', ['breederId']);
    await queryInterface.addIndex('VaccineSchedules', ['name']);
    await queryInterface.addIndex('VaccineSchedules', ['isActive']);
    await queryInterface.addIndex('VaccineSchedules', ['vaccineType']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VaccineSchedules');
  }
};
