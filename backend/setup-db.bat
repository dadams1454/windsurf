@echo off
echo Installing dependencies...
call npm install

echo Creating database...
echo Creating PostgreSQL database 'dogbreedersaas'...
set PGPASSWORD=postgres
createdb -U postgres dogbreedersaas

echo Running migrations...
call npx sequelize-cli db:migrate

echo Setup complete!
pause
