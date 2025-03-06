const { Sequelize } = require('sequelize');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import database config
const dbConfig = require('./config/db.config.js').development;

// Set up sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
  }
);

async function runMigrations() {
  try {
    // Test database connection
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Get migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.js'))
      .sort();

    console.log(`Found ${migrationFiles.length} migration files.`);

    // Execute each migration
    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const migration = require(path.join(migrationsDir, file));
      
      // Execute the migration 'up' function
      await migration.up(sequelize.getQueryInterface(), Sequelize);
      
      console.log(`Migration ${file} completed successfully.`);
    }

    console.log('All migrations completed successfully!');
    
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await sequelize.close();
  }
}

runMigrations();
