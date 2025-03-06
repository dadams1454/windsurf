'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Litters', {
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
        allowNull: false,
        references: {
          model: 'Dogs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      matingId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      litterName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      plannedBreedingDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      actualBreedingDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      expectedDueDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      actualBirthDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      totalPuppies: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      maleCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      femaleCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      puppiesBorn: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      puppiesLost: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      availablePuppies: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      reservedPuppies: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      soldPuppies: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      deposit: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(
          'Planned', 
          'Breeding Confirmed', 
          'Pregnancy Confirmed', 
          'Whelping', 
          'Raising',
          'Available', 
          'Sold Out', 
          'Completed', 
          'Cancelled'
        ),
        defaultValue: 'Planned'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      weaningDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      goHomeDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      litterTheme: {
        type: Sequelize.STRING,
        allowNull: true
      },
      litterData: {
        type: Sequelize.JSONB,
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
    await queryInterface.addIndex('Litters', ['breederId']);
    await queryInterface.addIndex('Litters', ['sireId']);
    await queryInterface.addIndex('Litters', ['damId']);
    await queryInterface.addIndex('Litters', ['matingId']);
    await queryInterface.addIndex('Litters', ['status']);
    await queryInterface.addIndex('Litters', ['actualBirthDate']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Litters');
  }
};
