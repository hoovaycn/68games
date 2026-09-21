$ErrorActionPreference = "Stop"

# Decode UTF-8 project name safely across all Windows PowerShell versions
$appName = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String("5YWtOOePreW8gumXu+W9lQ=="))

$rootDir = Split-Path -Parent $PSScriptRoot
$destDir = Join-Path $rootDir "dist_desktop\app_win_x64"
$finalDir = Join-Path $rootDir "dist_desktop\$appName"
$electronDist = Join-Path $rootDir "node_modules\electron\dist"

Write-Host "[1/4] Cleaning old builds..."
if (Test-Path $destDir) { Remove-Item -Path $destDir -Recurse -Force }
if (Test-Path $finalDir) { Remove-Item -Path $finalDir -Recurse -Force }
New-Item -ItemType Directory -Force -Path $destDir | Out-Null

Write-Host "[2/4] Copying Electron runtime..."
Copy-Item -Path "$electronDist\*" -Destination $destDir -Recurse -Force

Write-Host "[3/4] Renaming executable to $appName.exe..."
Rename-Item -Path "$destDir\electron.exe" -NewName "$appName.exe" -Force

Write-Host "[4/4] Preparing resources\app bundle..."
$appDir = Join-Path $destDir "resources\app"
New-Item -ItemType Directory -Force -Path $appDir | Out-Null
Copy-Item -Path (Join-Path $rootDir "package.json") -Destination (Join-Path $appDir "package.json") -Force
Copy-Item -Path (Join-Path $rootDir "electron") -Destination $appDir -Recurse -Force
Copy-Item -Path (Join-Path $rootDir "dist") -Destination (Join-Path $appDir "dist") -Recurse -Force

$defaultAsar = Join-Path $destDir "resources\default_app.asar"
if (Test-Path $defaultAsar) { Remove-Item -Path $defaultAsar -Force }

Move-Item -Path $destDir -Destination $finalDir -Force

Write-Host "=========================================="
Write-Host "Build complete!"
Write-Host "EXE Directory: $finalDir"
Write-Host "EXE Binary:    $finalDir\$appName.exe"
Write-Host "=========================================="
