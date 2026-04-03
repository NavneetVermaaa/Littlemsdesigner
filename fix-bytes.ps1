$filePath = 'C:\Users\navne\Downloads\backup\material-library-FINAL_7_4.html'
$text = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

$search1 = [char]0xC3 + [char]0xA2 + [char]0xE2 + [char]0x82 + [char]0xAC + [char]0xE2 + [char]0x80 + [char]0x9C
$replace1 = [char]0x2013

$text = $text.Replace($search1, $replace1)

[System.IO.File]::WriteAllText($filePath, $text, [System.Text.Encoding]::UTF8)
Write-Host "Done"
