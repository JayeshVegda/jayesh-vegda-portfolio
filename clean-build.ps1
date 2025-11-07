# Clean build script for Windows
Write-Host "Cleaning build cache..."

# Remove .next directory
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
    Write-Host "✓ Removed .next directory"
}

# Remove node_modules cache
if (Test-Path node_modules/.cache) {
    Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue
    Write-Host "✓ Removed node_modules cache"
}

# Remove TypeScript build info
if (Test-Path *.tsbuildinfo) {
    Remove-Item -Force *.tsbuildinfo -ErrorAction SilentlyContinue
    Write-Host "✓ Removed TypeScript build info"
}

Write-Host "`nCleanup complete! Now run: npm run dev"

