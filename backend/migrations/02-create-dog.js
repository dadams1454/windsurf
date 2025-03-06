'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dogs', {
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
      sireId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Dogs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      damId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Dogs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      litterId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      registeredName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      callName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      registrationNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      microchipNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      breed: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true
      },
      markings: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: false
      },
      birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(
          'Active', 
          'Breeding', 
          'Retired', 
          'Sold', 
          'Available', 
          'Reserved', 
          'Deceased'
        ),
        defaultValue: 'Active'
      },
      isOwnBred: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      acquiredFrom: {
        type: Sequelize.STRING,
        allowNull: true
      },
      acquiredDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      height: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      dna: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      profilePhoto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pedigreeCoefficient: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      titleAchievements: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      privateDogData: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      publicDogData: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      isPublic: {
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
    await queryInterface.addIndex('Dogs', ['breederId']);
    await queryInterface.addIndex('Dogs', ['sireId']);
    await queryInterface.addIndex('Dogs', ['damId']);
    await queryInterface.addIndex('Dogs', ['litterId']);
    await queryInterface.addIndex('Dogs', ['status']);
    await queryInterface.addIndex('Dogs', ['gender']);
    await queryInterface.addIndex('Dogs', ['breed']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Dogs');
  }
};
