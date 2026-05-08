@echo off
REM Food Delivery App - Setup Script for Windows
REM Run this script to setup both backend and frontend

echo.
echo 🚀 Food Delivery App - Complete Setup
echo ======================================
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd backend
echo Installing backend dependencies...
call npm install

echo Creating .env file from template...
if not exist .env (
  copy .env.example .env
  echo ✅ Created .env - Please update with your credentials
) else (
  echo ✅ .env already exists
)

cd ..

REM Frontend Setup
echo.
echo 📦 Setting up Frontend...
cd frontend
echo Installing frontend dependencies...
call npm install

echo Creating .env file from template...
if not exist .env (
  copy .env.example .env
  echo ✅ Created .env - Backend URL already configured
) else (
  echo ✅ .env already exists
)

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your database and payment credentials
echo 2. Start Backend: cd backend ^&^& npm run dev
echo 3. Start Frontend: cd frontend ^&^& npm run dev (in another terminal)
echo 4. Visit http://localhost:3000
echo.
echo Demo Credentials:
echo - Customer: customer1@example.com / admin123
echo - Admin: admin@fooddelivery.com / admin123
echo - Agent: agent1@fooddelivery.com / admin123
echo.
pause
