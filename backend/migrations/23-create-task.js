'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
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
      assignedToId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('Not Started', 'In Progress', 'Completed', 'Cancelled', 'Overdue'),
        defaultValue: 'Not Started'
      },
      priority: {
        type: Sequelize.ENUM('Low', 'Normal', 'High', 'Urgent'),
        defaultValue: 'Normal'
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      completedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      completedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      taskType: {
        type: Sequelize.ENUM(
          'General', 
          'Health', 
          'Breeding', 
          'Whelping', 
          'Vaccination', 
          'Grooming', 
          'Training', 
          'Paperwork', 
          'Client', 
          'Financial', 
          'Event', 
          'Other'
        ),
        defaultValue: 'General'
      },
      isRecurring: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      recurringPattern: {
        type: Sequelize.STRING,
        allowNull: true
      },
      reminderEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      reminderTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      reminderSent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isAllDay: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      relatedEntityType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      relatedEntityId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      color: {
        type: Sequelize.STRING,
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
    await queryInterface.addIndex('Tasks', ['breederId']);
    await queryInterface.addIndex('Tasks', ['assignedToId']);
    await queryInterface.addIndex('Tasks', ['status']);
    await queryInterface.addIndex('Tasks', ['priority']);
    await queryInterface.addIndex('Tasks', ['dueDate']);
    await queryInterface.addIndex('Tasks', ['taskType']);
    await queryInterface.addIndex('Tasks', ['relatedEntityType', 'relatedEntityId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  }
};
