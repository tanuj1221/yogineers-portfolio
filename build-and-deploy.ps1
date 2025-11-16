# Build and Deploy Script for Yogineers Portfolio

Write-Host "Building frontend..." -ForegroundColor Cyan
Set-Location portfolio_frontend_final
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Frontend build successful!" -ForegroundColor Green
    
    Write-Host "Copying build to backend..." -ForegroundColor Cyan
    Set-Location ..
    
    # Remove old dist folder if exists
    if (Test-Path "yogineers-portfolio-backend\dist") {
        Remove-Item -Path "yogineers-portfolio-backend\dist" -Recurse -Force
    }
    
    # Copy new build
    Copy-Item -Path "portfolio_frontend_final\dist" -Destination "yogineers-portfolio-backend\dist" -Recurse -Force
    
    Write-Host "Build deployed to backend successfully!" -ForegroundColor Green
    Write-Host "You can now start the backend server with: cd yogineers-portfolio-backend && npm start" -ForegroundColor Yellow
} else {
    Write-Host "Frontend build failed!" -ForegroundColor Red
    Set-Location ..
}
