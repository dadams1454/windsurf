'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LitterPhotos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      litterId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Litters',
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
      isCoverPhoto: {
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
      puppyAge: {
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
    await queryInterface.addIndex('LitterPhotos', ['litterId']);
    await queryInterface.addIndex('LitterPhotos', ['breederId']);
    await queryInterface.addIndex('LitterPhotos', ['isCoverPhoto']);
    await queryInterface.addIndex('LitterPhotos', ['isPublic']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LitterPhotos');
  }
};
