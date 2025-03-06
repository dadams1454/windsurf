'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
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
      dogId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Dogs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      reservationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(
          'Pending', 
          'Approved', 
          'Waitlisted', 
          'Cancelled', 
          'Completed', 
          'Refunded'
        ),
        defaultValue: 'Pending'
      },
      depositAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      depositPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      depositDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      fullPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      totalPaid: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00
      },
      isRefundable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      preferredGender: {
        type: Sequelize.ENUM('Male', 'Female', 'Either'),
        allowNull: true
      },
      preferredColor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      preferredMarkings: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pickOrder: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Order in which buyer gets to pick (1st pick, 2nd pick, etc)'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isContractSigned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      contactSignatureDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      breederSignatureDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      isFinalized: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      finalizedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      cancelledDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      cancellationReason: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: true
      },
      additionalTerms: {
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
    await queryInterface.addIndex('Reservations', ['breederId']);
    await queryInterface.addIndex('Reservations', ['contactId']);
    await queryInterface.addIndex('Reservations', ['litterId']);
    await queryInterface.addIndex('Reservations', ['dogId']);
    await queryInterface.addIndex('Reservations', ['status']);
    await queryInterface.addIndex('Reservations', ['reservationDate']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservations');
  }
};
