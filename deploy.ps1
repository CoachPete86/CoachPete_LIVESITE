# Jolene PWA Deployment Script
# This script prepares your files for deployment to coachpeteryan.com/jolenepwa

Write-Host "🚀 Jolene PWA Deployment Preparation" -ForegroundColor Green

# Check if build folder exists
if (!(Test-Path "build")) {
    Write-Host "❌ Build folder not found. Running build..." -ForegroundColor Red
    npm run build
}

# Create deployment folder
$deployPath = "deploy-to-server"
if (Test-Path $deployPath) {
    Remove-Item $deployPath -Recurse -Force
}
New-Item -ItemType Directory -Path $deployPath

# Copy all build files to deployment folder
Write-Host "📁 Copying files for deployment..." -ForegroundColor Yellow
Copy-Item "build/*" $deployPath -Recurse

Write-Host "✅ Files ready for deployment in '$deployPath' folder" -ForegroundColor Green

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Upload the contents of '$deployPath' folder to your web server"
Write-Host "2. Place them in a 'jolenepwa' directory on your server"
Write-Host "3. Your main website stays at coachpeteryan.com"
Write-Host "4. Jolene PWA will be at coachpeteryan.com/jolenepwa"

Write-Host "`n📂 Upload these files to your server's 'jolenepwa' directory:" -ForegroundColor White
Get-ChildItem $deployPath -Recurse | ForEach-Object {
    $relativePath = $_.FullName.Replace((Get-Location).Path + "\$deployPath\", "")
    Write-Host "   $relativePath"
}

Write-Host "`n🔗 After upload, test at: https://www.coachpeteryan.com/jolenepwa" -ForegroundColor Green
