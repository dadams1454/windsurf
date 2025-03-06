'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DogPhotos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
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
      fileName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      filePath: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fileType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fileSize: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isProfilePhoto: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      displayOrder: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      uploadDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      takenDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      dogAge: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
    await queryInterface.addIndex('DogPhotos', ['dogId']);
    await queryInterface.addIndex('DogPhotos', ['breederId']);
    await queryInterface.addIndex('DogPhotos', ['isProfilePhoto']);
    await queryInterface.addIndex('DogPhotos', ['isPublic']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DogPhotos');
  }
};
