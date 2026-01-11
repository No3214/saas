# ============================================
# n8n Workflow Bulk Importer
# Grain SaaS Automation Suite
# ============================================

param(
    [string]$N8nUrl = "http://localhost:5678",
    [string]$ApiKey = $env:N8N_API_KEY
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Grain n8n Bulk Workflow Importer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if API key is provided
if (-not $ApiKey) {
    Write-Host "UYARI: N8N_API_KEY bulunamadi!" -ForegroundColor Yellow
    Write-Host "Lutfen API key'i environment variable olarak ayarlayin:" -ForegroundColor Yellow
    Write-Host '  $env:N8N_API_KEY = "your-api-key"' -ForegroundColor Gray
    Write-Host ""
    Write-Host "Veya scripti su sekilde calistirin:" -ForegroundColor Yellow
    Write-Host '  .\import_all.ps1 -ApiKey "your-api-key"' -ForegroundColor Gray
    Write-Host ""
    
    # Try CLI method instead
    Write-Host "CLI yontemi deneniyor..." -ForegroundColor Cyan
    $useCli = $true
} else {
    $useCli = $false
}

# Get all JSON workflow files
$workflowFiles = Get-ChildItem -Path $PSScriptRoot -Filter "Grain_*.json"
$totalFiles = $workflowFiles.Count
$successCount = 0
$failCount = 0
$failedFiles = @()

Write-Host "Bulunan workflow sayisi: $totalFiles" -ForegroundColor Green
Write-Host ""

foreach ($file in $workflowFiles) {
    Write-Host "[$($successCount + $failCount + 1)/$totalFiles] Importing: $($file.Name)... " -NoNewline
    
    try {
        if ($useCli) {
            # Use n8n CLI
            $result = n8n import:workflow --input="$($file.FullName)" 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "OK" -ForegroundColor Green
                $successCount++
            } else {
                Write-Host "HATA" -ForegroundColor Red
                $failCount++
                $failedFiles += $file.Name
            }
        } else {
            # Use API
            $jsonContent = Get-Content -Path $file.FullName -Raw
            
            $headers = @{
                "X-N8N-API-KEY" = $ApiKey
                "Content-Type" = "application/json"
            }
            
            $response = Invoke-RestMethod -Uri "$N8nUrl/api/v1/workflows" -Method Post -Headers $headers -Body $jsonContent -ErrorAction Stop
            
            Write-Host "OK (ID: $($response.id))" -ForegroundColor Green
            $successCount++
        }
    }
    catch {
        Write-Host "HATA: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
        $failedFiles += $file.Name
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  IMPORT TAMAMLANDI" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Basarili: $successCount / $totalFiles" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "Basarisiz: $failCount" -ForegroundColor Red
    Write-Host ""
    Write-Host "Basarisiz dosyalar:" -ForegroundColor Yellow
    foreach ($f in $failedFiles) {
        Write-Host "  - $f" -ForegroundColor Yellow
    }
}
Write-Host ""
Write-Host "Sonraki adimlar:" -ForegroundColor Cyan
Write-Host "1. n8n arayuzunu acin: $N8nUrl" -ForegroundColor Gray
Write-Host "2. Credentials'lari ayarlayin (OpenAI, Slack, Google Sheets, vb.)" -ForegroundColor Gray
Write-Host "3. Environment variables'lari kontrol edin" -ForegroundColor Gray
Write-Host ""
