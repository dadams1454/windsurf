'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FinancialRecords', {
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
      type: {
        type: Sequelize.ENUM('Income', 'Expense'),
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subcategory: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: true
      },
      receipt: {
        type: Sequelize.STRING,
        allowNull: true
      },
      receiptUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isRecurring: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      recurringPattern: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isBusinessExpense: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      taxCategory: {
        type: Sequelize.STRING,
        allowNull: true
      },
      taxDeductible: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      vendor: {
        type: Sequelize.STRING,
        allowNull: true
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
      transactionId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Transactions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      notes: {
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex('FinancialRecords', ['breederId']);
    await queryInterface.addIndex('FinancialRecords', ['type']);
    await queryInterface.addIndex('FinancialRecords', ['category']);
    await queryInterface.addIndex('FinancialRecords', ['date']);
    await queryInterface.addIndex('FinancialRecords', ['contactId']);
    await queryInterface.addIndex('FinancialRecords', ['dogId']);
    await queryInterface.addIndex('FinancialRecords', ['litterId']);
    await queryInterface.addIndex('FinancialRecords', ['saleId']);
    await queryInterface.addIndex('FinancialRecords', ['reservationId']);
    await queryInterface.addIndex('FinancialRecords', ['transactionId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FinancialRecords');
  }
};
