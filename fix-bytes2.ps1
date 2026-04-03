$filePath = 'C:\Users\navne\Downloads\backup\material-library-FINAL_7_4.html'
$bytes = [System.IO.File]::ReadAllBytes($filePath)

$search = [byte[]](0xC3, 0xA2, 0xE2, 0x82, 0xAC, 0xE2, 0x80, 0x9C)
$replace = [byte[]](0xE2, 0x80, 0x93)

$output = New-Object System.Collections.Generic.List[byte]
$i = 0
while ($i -lt $bytes.Length) {
    $found = $true
    for ($j = 0; $j -lt $search.Length; $j++) {
        if ($i + $j -ge $bytes.Length -or $bytes[$i + $j] -ne $search[$j]) {
            $found = $false
            break
        }
    }
    if ($found) {
        $output.AddRange($replace)
        $i += $search.Length
    } else {
        $output.Add($bytes[$i])
        $i++
    }
}

[System.IO.File]::WriteAllBytes($filePath, $output.ToArray())
Write-Host "Done"
