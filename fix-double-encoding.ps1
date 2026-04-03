$filePath = 'C:\Users\navne\Downloads\backup\material-library-FINAL_7_4.html'
$text = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$text = $text -replace 'â€"', '–'
$text = $text -replace 'â€" ', '– '
$text = $text -replace ' â€"', ' –'
$text = $text -replace 'â€"([0-9])', '– $1'
$text = $text -replace 'â€" ([0-9])', '– $1'
$text = $text -replace 'â€"([A-Z])', '– $1'
$text = $text -replace 'â€" ([A-Z])', '– $1'

[System.IO.File]::WriteAllText($filePath, $text, [System.Text.Encoding]::UTF8)
Write-Host "Done"
