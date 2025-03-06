'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matings', {
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
        allowNull: false,
        references: {
          model: 'Dogs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      plannedDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(
          'Planned', 
          'In Progress', 
          'Completed', 
          'Successful', 
          'Unsuccessful', 
          'Cancelled'
        ),
        defaultValue: 'Planned'
      },
      type: {
        type: Sequelize.ENUM('Natural', 'Artificial Insemination', 'Surgical AI', 'Other'),
        defaultValue: 'Natural'
      },
      method: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      successConfirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      confirmationDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      confirmationMethod: {
        type: Sequelize.STRING,
        allowNull: true
      },
      expectedDueDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      litterId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      studFee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      studFeeType: {
        type: Sequelize.ENUM('Cash', 'Pick of Litter', 'Multiple Puppies', 'Co-Ownership', 'Other'),
        allowNull: true
      },
      studFeePaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      contractId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      progesteroneTests: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      brucellosisTested: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      brucellosisResults: {
        type: Sequelize.STRING,
        allowNull: true
      },
      brucellosisDate: {
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
    await queryInterface.addIndex('Matings', ['breederId']);
    await queryInterface.addIndex('Matings', ['sireId']);
    await queryInterface.addIndex('Matings', ['damId']);
    await queryInterface.addIndex('Matings', ['status']);
    await queryInterface.addIndex('Matings', ['litterId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matings');
  }
};
