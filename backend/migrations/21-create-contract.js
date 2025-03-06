'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contracts', {
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
      contractType: {
        type: Sequelize.ENUM('Sales', 'Co-Ownership', 'Stud Service', 'Breeding Rights', 'Other'),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isTemplate: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: Sequelize.ENUM('Draft', 'Sent', 'Signed', 'Expired', 'Cancelled', 'Completed'),
        defaultValue: 'Draft'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      effectiveDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      expirationDate: {
        type: Sequelize.DATEONLY,
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
      signatureRequired: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      signedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      signedById: {
        type: Sequelize.UUID,
        allowNull: true
      },
      signedByType: {
        type: Sequelize.ENUM('User', 'Contact'),
        allowNull: true
      },
      signatureIpAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      templateVariables: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      lastModified: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
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
    await queryInterface.addIndex('Contracts', ['breederId']);
    await queryInterface.addIndex('Contracts', ['contractType']);
    await queryInterface.addIndex('Contracts', ['status']);
    await queryInterface.addIndex('Contracts', ['contactId']);
    await queryInterface.addIndex('Contracts', ['dogId']);
    await queryInterface.addIndex('Contracts', ['saleId']);
    await queryInterface.addIndex('Contracts', ['isTemplate']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contracts');
  }
};
