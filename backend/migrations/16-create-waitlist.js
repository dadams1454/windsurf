'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Waitlists', {
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
      breed: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preferredGender: {
        type: Sequelize.ENUM('Male', 'Female', 'Either'),
        allowNull: true
      },
      preferredColor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      preferredAgeRange: {
        type: Sequelize.STRING,
        allowNull: true
      },
      timeframe: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(
          'Active', 
          'Reserved', 
          'Completed', 
          'Cancelled', 
          'Expired', 
          'On Hold'
        ),
        defaultValue: 'Active'
      },
      waitlistPosition: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      joinDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      lastNotificationDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isDepositPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      depositAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      depositDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      notifyOnLitterAnnouncement: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      litterId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Litters',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      reservationId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Reservations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.addIndex('Waitlists', ['breederId']);
    await queryInterface.addIndex('Waitlists', ['contactId']);
    await queryInterface.addIndex('Waitlists', ['status']);
    await queryInterface.addIndex('Waitlists', ['breed']);
    await queryInterface.addIndex('Waitlists', ['litterId']);
    await queryInterface.addIndex('Waitlists', ['reservationId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Waitlists');
  }
};
