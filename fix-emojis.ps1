# Fix all mis-encoded emojis across the Click-Safe website

$replacements = @{
    'ðŸŽ¯' = '🎯'
    'ðŸ"‰' = '📉'
    'ðŸ'¡' = '💡'
    'ðŸ›¡ï¸' = '🛡️'
    'ðŸš¨' = '🚨'
    'ðŸ"‹' = '📋'
    'ðŸŽ‰' = '🎉'
    'âœ…' = '✅'
    'âš"ï¸' = '⚔️'
    'âš ï¸' = '⚠️'
    'ðŸŽ¬' = '🎬'
    'ðŸ'ï¸' = '👁️'
    'ðŸ›ï¸' = '🏛️'
    'ðŸ"š' = '📚'
    'ðŸ""' = '🔓'
    'ðŸ"—' = '🔗'
    'ðŸŒ' = '🌐'
    'ðŸ†"' = '🆔'
    'ðŸ¦ ' = '🦠'
    'ðŸŽ£' = '🎣'
    'ðŸ•µï¸' = '🕵️'
    'ðŸš«' = '🚫'
    'ðŸ¤–' = '🤖'
    'ðŸ†˜' = '🆘'
    'ðŸ"ž' = '🔞'
    'ðŸ"Œ' = '📌'
    'ðŸ"'' = '🔒'
    'ðŸ"Š' = '📊'
    'â€"' = '—'
}

$files = @(
    'resources\case-studies.html',
    'resources\videos.html',
    'resources\external.html',
    'resources\checklists.html',
    'resources\tools.html',
    'resources\topics\index.html',
    'about.html',
    'personal-security\create-passwords.html',
    'family-home\smart-home.html',
    'resources\topics\harassment\cyberbullying.html',
    'resources\topics\identity-fraud\identity-theft-osn.html',
    'resources\topics\identity-fraud\user-profiling-surveillance.html',
    'resources\assessment\quizzes\beginner-quiz.html'
)

$count = 0
foreach ($file in $files) {
    $fullPath = Join-Path $PSScriptRoot $file
    if (Test-Path $fullPath) {
        $content = Get-Content -Path $fullPath -Raw -Encoding UTF8
        $changed = $false
        foreach ($old in $replacements.Keys) {
            if ($content -match [regex]::Escape($old)) {
                $content = $content -replace [regex]::Escape($old), $replacements[$old]
                $changed = $true
            }
        }
        if ($changed) {
            [System.IO.File]::WriteAllText($fullPath, $content, [System.Text.UTF8Encoding]::new($false))
            $count++
            Write-Host "Fixed: $file"
        }
    } else {
        Write-Host "Not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "`nFixed $count files" -ForegroundColor Green
