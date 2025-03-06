'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sales', {
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
      saleDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      salePrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      depositAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      balanceDue: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      balancePaidDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      isFullyPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM(
          'Pending', 
          'Processing', 
          'Completed', 
          'Cancelled', 
          'Refunded'
        ),
        defaultValue: 'Pending'
      },
      saleType: {
        type: Sequelize.ENUM(
          'Pet', 
          'Show Potential', 
          'Show Rights', 
          'Breeding Rights', 
          'Full Rights', 
          'Co-Ownership', 
          'Other'
        ),
        defaultValue: 'Pet'
      },
      contractType: {
        type: Sequelize.ENUM(
          'Limited Registration', 
          'Full Registration', 
          'Co-Ownership', 
          'Guardian Home', 
          'Other'
        ),
        allowNull: true
      },
      isContractSigned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      contractSignedDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      akc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      microchipped: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      registrationProvided: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      healthCertificateProvided: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      healthGuarantee: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      healthGuaranteePeriod: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pickupDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      isDeliveryRequired: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deliveryDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      deliveryMethod: {
        type: Sequelize.STRING,
        allowNull: true
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      deliveryCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      specialTerms: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      saleItems: {
        type: Sequelize.JSONB,
        allowNull: true,
        comment: 'Additional items included with sale (food, supplies, etc)'
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
    await queryInterface.addIndex('Sales', ['breederId']);
    await queryInterface.addIndex('Sales', ['dogId']);
    await queryInterface.addIndex('Sales', ['contactId']);
    await queryInterface.addIndex('Sales', ['reservationId']);
    await queryInterface.addIndex('Sales', ['status']);
    await queryInterface.addIndex('Sales', ['saleDate']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sales');
  }
};
