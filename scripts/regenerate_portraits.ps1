param(
  [string]$ArtDir = "E:\WorkBuddy\fx_game\assets\art",
  [string]$PortraitDir = "E:\WorkBuddy\fx_game\assets\portraits",
  [string[]]$Only = @()
)

Add-Type -AssemblyName System.Drawing

function Get-CanonicalName([string]$baseName) {
  $name = $baseName
  if ($name.EndsWith('@2x')) {
    $name = $name.Substring(0, $name.Length - 3)
  }
  $suffixes = @('_default', '_corrupted', '_sad')
  foreach ($suffix in $suffixes) {
    if ($name.EndsWith($suffix)) {
      return $name.Substring(0, $name.Length - $suffix.Length)
    }
  }
  return $name
}

function Is-MagentaBackground([System.Drawing.Color]$color) {
  return $color.A -gt 250 -and $color.R -ge 250 -and $color.G -le 5 -and $color.B -ge 250
}

function Get-ForegroundBounds([System.Drawing.Bitmap]$bitmap) {
  $minX = $bitmap.Width
  $minY = $bitmap.Height
  $maxX = -1
  $maxY = -1

  for ($y = 0; $y -lt $bitmap.Height; $y++) {
    for ($x = 0; $x -lt $bitmap.Width; $x++) {
      $color = $bitmap.GetPixel($x, $y)
      if ($color.A -le 10 -or (Is-MagentaBackground $color)) {
        continue
      }
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }

  if ($maxX -lt 0) {
    return [System.Drawing.Rectangle]::FromLTRB(0, 0, $bitmap.Width, $bitmap.Height)
  }

  return [System.Drawing.Rectangle]::FromLTRB($minX, $minY, $maxX + 1, $maxY + 1)
}

function Get-UpperBodyCenterX([System.Drawing.Bitmap]$bitmap, [System.Drawing.Rectangle]$bounds) {
  $upperLimit = [int]($bounds.Top + $bounds.Height * 0.45)
  $sumX = 0
  $count = 0

  for ($y = $bounds.Top; $y -lt [Math]::Min($upperLimit, $bitmap.Height); $y++) {
    for ($x = $bounds.Left; $x -lt $bounds.Right; $x++) {
      $color = $bitmap.GetPixel($x, $y)
      if ($color.A -le 10 -or (Is-MagentaBackground $color)) {
        continue
      }
      $sumX += $x
      $count += 1
    }
  }

  if ($count -eq 0) {
    return [int]($bounds.Left + $bounds.Width / 2)
  }

  return [int]($sumX / $count)
}

$portraitProfiles = @{
  'adult_liu'              = @{ Crop = 128; TopOffset = 14; XAdjust = 0 }
  'ayuan'                  = @{ Crop = 138; TopOffset = 12; XAdjust = 0 }
  'chenpinxuan'            = @{ Crop = 136; TopOffset = 14; XAdjust = 0 }
  'classmate_boy'          = @{ Crop = 124; TopOffset = 18; XAdjust = 0 }
  'classmate_girl'         = @{ Crop = 126; TopOffset = 18; XAdjust = 0 }
  'coach'                  = @{ Crop = 140; TopOffset = 12; XAdjust = 0 }
  'fanwenmo'               = @{ Crop = 124; TopOffset = 18; XAdjust = 0 }
  'grade1_student'         = @{ Crop = 118; TopOffset = 12; XAdjust = 0 }
  'heyanxi'                = @{ Crop = 124; TopOffset = 18; XAdjust = 0 }
  'mystery_man'            = @{ Crop = 140; TopOffset = 10; XAdjust = -4 }
  'parent_rep'             = @{ Crop = 128; TopOffset = 16; XAdjust = 0 }
  'punk'                   = @{ Crop = 136; TopOffset = 16; XAdjust = 0 }
  'qinruiyi'               = @{ Crop = 142; TopOffset = 10; XAdjust = 0 }
  'senior_athlete'         = @{ Crop = 130; TopOffset = 16; XAdjust = 0 }
  'senior_athlete_leader'  = @{ Crop = 132; TopOffset = 14; XAdjust = 0 }
  'shadow_woman'           = @{ Crop = 122; TopOffset = 12; XAdjust = -2 }
  'shiyunuo'               = @{ Crop = 126; TopOffset = 18; XAdjust = 0 }
  'teacher_pe'             = @{ Crop = 130; TopOffset = 16; XAdjust = 0 }
  'teacher_xu'             = @{ Crop = 132; TopOffset = 14; XAdjust = 0 }
  'vendor'                 = @{ Crop = 136; TopOffset = 14; XAdjust = 0 }
  'young_liu'              = @{ Crop = 132; TopOffset = 14; XAdjust = 0 }
  'young_xu'               = @{ Crop = 134; TopOffset = 12; XAdjust = 0 }
  'zhanghanyu'             = @{ Crop = 124; TopOffset = 18; XAdjust = 0 }
  'zhangxizhe'             = @{ Crop = 128; TopOffset = 16; XAdjust = 0 }
  'zhangzixiao'            = @{ Crop = 126; TopOffset = 16; XAdjust = 0 }
  'zhuyanze'               = @{ Crop = 126; TopOffset = 16; XAdjust = 0 }
}

$defaultProfile = @{ Crop = 130; TopOffset = 16; XAdjust = 0 }

function Get-CropRect([System.Drawing.Bitmap]$bitmap, [string]$fileName) {
  $baseName = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
  $scale = 1
  if ($baseName.EndsWith('@2x')) {
    $scale = 2
  }

  $canonical = Get-CanonicalName $baseName
  $profile = $portraitProfiles[$canonical]
  if (-not $profile) {
    $profile = $defaultProfile
  }

  $bounds = Get-ForegroundBounds $bitmap
  $crop = [int]($profile.Crop * $scale)
  $centerX = Get-UpperBodyCenterX $bitmap $bounds
  $centerX += [int]($profile.XAdjust * $scale)

  $left = [int]($centerX - $crop / 2)
  $top = [int]($bounds.Top + ($profile.TopOffset * $scale))

  if ($left -lt 0) { $left = 0 }
  if ($top -lt 0) { $top = 0 }
  if ($left + $crop -gt $bitmap.Width) { $left = $bitmap.Width - $crop }
  if ($top + $crop -gt $bitmap.Height) { $top = $bitmap.Height - $crop }

  if ($left -lt 0) { $left = 0 }
  if ($top -lt 0) { $top = 0 }

  return [System.Drawing.Rectangle]::FromLTRB($left, $top, $left + $crop, $top + $crop)
}

function Save-Portrait([string]$sourcePath, [string]$targetPath) {
  $bitmap = [System.Drawing.Bitmap]::FromFile($sourcePath)
  $rect = Get-CropRect $bitmap ([System.IO.Path]::GetFileName($sourcePath))
  $outSize = if ($sourcePath.EndsWith('@2x.png')) { 192 } else { 96 }
  $output = New-Object System.Drawing.Bitmap($outSize, $outSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($output)

  $graphics.Clear([System.Drawing.Color]::FromArgb(255, 255, 0, 255))
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::None
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighSpeed
  $graphics.DrawImage(
    $bitmap,
    [System.Drawing.Rectangle]::FromLTRB(0, 0, $outSize, $outSize),
    $rect,
    [System.Drawing.GraphicsUnit]::Pixel
  )

  $graphics.Dispose()
  $bitmap.Dispose()
  $output.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $output.Dispose()

  return $rect
}

$artFiles = Get-ChildItem $ArtDir -File -Filter *.png | Where-Object { $_.BaseName -notmatch '^bg_' }
if ($Only.Count -gt 0) {
  $set = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)
  foreach ($name in $Only) {
    [void]$set.Add($name)
  }
  $artFiles = $artFiles | Where-Object { $set.Contains($_.BaseName) -or $set.Contains($_.Name) -or $set.Contains((Get-CanonicalName $_.BaseName)) }
}

$results = foreach ($file in $artFiles) {
  $targetPath = Join-Path $PortraitDir $file.Name
  $rect = Save-Portrait $file.FullName $targetPath
  [pscustomobject]@{
    File = $file.Name
    Crop = "$($rect.X),$($rect.Y),$($rect.Width),$($rect.Height)"
  }
}

$results | Sort-Object File | Format-Table -AutoSize
"TOTAL=$($results.Count)"
