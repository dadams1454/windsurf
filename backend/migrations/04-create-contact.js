'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contacts', {
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
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      contactType: {
        type: Sequelize.ENUM('Buyer', 'Breeder', 'Veterinarian', 'Supplier', 'Other'),
        defaultValue: 'Buyer'
      },
      status: {
        type: Sequelize.ENUM(
          'Lead', 
          'Waiting', 
          'Active', 
          'Reserved', 
          'Purchased', 
          'Past Customer', 
          'Declined', 
          'Blacklisted', 
          'Other'
        ),
        defaultValue: 'Lead'
      },
      preferredBreed: {
        type: Sequelize.STRING,
        allowNull: true
      },
      preferredGender: {
        type: Sequelize.ENUM('Male', 'Female', 'Either'),
        allowNull: true
      },
      preferredColor: {
        type: Sequelize.STRING,
        allowNull: true
      },
      preferredAge: {
        type: Sequelize.STRING,
        allowNull: true
      },
      preferredTimeframe: {
        type: Sequelize.STRING,
        allowNull: true
      },
      preferredPrice: {
        type: Sequelize.STRING,
        allowNull: true
      },
      homeDescription: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      petExperience: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      additionalInfo: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      source: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      followUpDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      isSubscribedToUpdates: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      lastContactDate: {
        type: Sequelize.DATE,
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
    await queryInterface.addIndex('Contacts', ['breederId']);
    await queryInterface.addIndex('Contacts', ['email']);
    await queryInterface.addIndex('Contacts', ['status']);
    await queryInterface.addIndex('Contacts', ['contactType']);
    await queryInterface.addIndex('Contacts', ['followUpDate']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contacts');
  }
};
