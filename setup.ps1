# Food Delivery App - Setup Script for PowerShell
# Run this script to setup both backend and frontend

Write-Host ""
Write-Host "🚀 Food Delivery App - Complete Setup"
Write-Host "======================================"
Write-Host ""

# Backend Setup
Write-Host "📦 Setting up Backend..."
Push-Location backend
Write-Host "Installing backend dependencies..."
npm install

Write-Host "Creating .env file from template..."
if (-not (Test-Path .env)) {
  Copy-Item .env.example .env
  Write-Host "✅ Created .env - Please update with your credentials"
} else {
  Write-Host "✅ .env already exists"
}

Pop-Location

# Frontend Setup
Write-Host ""
Write-Host "📦 Setting up Frontend..."
Push-Location frontend
Write-Host "Installing frontend dependencies..."
npm install

Write-Host "Creating .env file from template..."
if (-not (Test-Path .env)) {
  Copy-Item .env.example .env
  Write-Host "✅ Created .env - Backend URL already configured"
} else {
  Write-Host "✅ .env already exists"
}

Pop-Location

Write-Host ""
Write-Host "✅ Setup Complete!"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Update backend\.env with your database and payment credentials"
Write-Host "2. Start Backend: cd backend; npm run dev"
Write-Host "3. Start Frontend: cd frontend; npm run dev (in another terminal)"
Write-Host "4. Visit http://localhost:3000"
Write-Host ""
Write-Host "Demo Credentials:"
Write-Host "- Customer: customer1@example.com / admin123"
Write-Host "- Admin: admin@fooddelivery.com / admin123"
Write-Host "- Agent: agent1@fooddelivery.com / admin123"
Write-Host ""
Read-Host "Press Enter to exit"
