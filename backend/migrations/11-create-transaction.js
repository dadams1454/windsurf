'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
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
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('Payment', 'Refund', 'Deposit', 'Adjustment'),
        defaultValue: 'Payment'
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Completed', 'Failed', 'Refunded', 'Cancelled'),
        defaultValue: 'Completed'
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      saleId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Sales',
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
      contactId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Contacts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      transactionId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'External transaction ID from payment processor'
      },
      paymentProcessor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      receiptUrl: {
        type: Sequelize.STRING,
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
    await queryInterface.addIndex('Transactions', ['breederId']);
    await queryInterface.addIndex('Transactions', ['saleId']);
    await queryInterface.addIndex('Transactions', ['reservationId']);
    await queryInterface.addIndex('Transactions', ['contactId']);
    await queryInterface.addIndex('Transactions', ['status']);
    await queryInterface.addIndex('Transactions', ['date']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};
