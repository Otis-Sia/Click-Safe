# Simple emoji replacement script
$files = @(
    'c:\Users\Administrator\Desktop\CODE\Click-Safe\resources\topics\harassment\cyberbullying.html',
    'c:\Users\Administrator\Desktop\CODE\Click-Safe\resources\external.html',
    'c:\Users\Administrator\Desktop\CODE\Click-Safe\resources\checklists.html',
    'c:\Users\Administrator\Desktop\CODE\Click-Safe\resources\case-studies.html',
    'c:\Users\Administrator\Desktop\CODE\Click-Safe\resources\tools.html'
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    $content = $content.Replace('ðŸ"ž', '📞')
    $content = $content.Replace('ðŸ›ï¸', '🏛️')
    $content = $content.Replace('ðŸ"—', '🔗')
    $content = $content.Replace('ðŸ"š', '📚')
    $content = $content.Replace('ðŸ""', '🔐')
    $content = $content.Replace('ðŸ›¡ï¸', '🛡️')
    $content = $content.Replace('ðŸ"Œ', '📌')
    $content = $content.Replace('ðŸ'¡', '💡')
  $content = $content.Replace('ðŸŽ¯', '🎯')
  $content = $content.Replace('ðŸš¨', '🚨')
  Set-Content $file -Value $content -NoNewline -Encoding UTF8
  Write-Host "Fixed: $file"
}
