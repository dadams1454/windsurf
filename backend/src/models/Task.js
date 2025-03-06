module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    breederId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    assignedToId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      comment: 'User ID of the person assigned to this task'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Not Started', 'In Progress', 'Completed', 'Cancelled', 'Overdue'),
      defaultValue: 'Not Started'
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Normal', 'High', 'Urgent'),
      defaultValue: 'Normal'
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    completedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    completedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    taskType: {
      type: DataTypes.ENUM(
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
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    recurringPattern: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Pattern for recurring tasks (daily, weekly, monthly, etc.)'
    },
    reminderEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    reminderTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reminderSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAllDay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether this is an all-day event (for calendar)'
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Start time for events with a duration'
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'End time for events with a duration'
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Location for the task or event'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    relatedEntityType: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Type of entity this task is related to (Dog, Litter, Contact, etc.)'
    },
    relatedEntityId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: 'ID of the entity this task is related to'
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Color for calendar display'
    }
  }, {
    timestamps: true
  });

  Task.associate = (models) => {
    // A task belongs to a breeder
    Task.belongsTo(models.User, {
      foreignKey: 'breederId',
      as: 'breeder'
    });

    // A task may be assigned to a user
    Task.belongsTo(models.User, {
      foreignKey: 'assignedToId',
      as: 'assignedTo'
    });

    // A task may be completed by a user
    Task.belongsTo(models.User, {
      foreignKey: 'completedBy',
      as: 'completedByUser'
    });
  };

  return Task;
};
