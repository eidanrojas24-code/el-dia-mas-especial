# Servidor local de respaldo (si no hay Python). Robusto: errores por petición, Range y copia por bloques.
$port = 3000; $folder = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
try { $listener.Prefixes.Add("http://localhost:$port/"); $listener.Start() }
catch { $port = 3001; $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add("http://localhost:$port/"); $listener.Start() }
Write-Host "Servidor activo: http://localhost:$port (Ctrl+C para detener)" -ForegroundColor Cyan
Start-Process "http://localhost:$port/"
$mime = @{ ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".js"="application/javascript; charset=utf-8"; ".svg"="image/svg+xml"; ".mp3"="audio/mpeg"; ".wav"="audio/wav"; ".png"="image/png"; ".jpg"="image/jpeg"; ".webp"="image/webp"; ".ico"="image/x-icon" }
while ($listener.IsListening) {
  $ctx = $listener.GetContext(); $res = $ctx.Response
  try {
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.LocalPath).TrimStart('/')
    if ([string]::IsNullOrEmpty($rel) -or $rel.Contains("..")) { $rel = "index.html" }
    $file = Join-Path $folder $rel
    if (-not (Test-Path $file -PathType Leaf)) { $file = Join-Path $folder "index.html" }
    $ext = [System.IO.Path]::GetExtension($file).ToLower()
    $res.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
    $res.AddHeader("Accept-Ranges", "bytes")
    $fs = [System.IO.File]::Open($file, 'Open', 'Read', 'ReadWrite'); $size = $fs.Length
    $start = 0; $end = $size - 1; $range = $ctx.Request.Headers["Range"]
    if ($range -match "bytes=(\d*)-(\d*)") {
      if ($Matches[1]) { $start = [long]$Matches[1] }
      if ($Matches[2]) { $end = [Math]::Min([long]$Matches[2], $size - 1) }
      $res.StatusCode = 206; $res.AddHeader("Content-Range", "bytes $start-$end/$size")
    }
    $res.ContentLength64 = $end - $start + 1; $fs.Seek($start, 'Begin') | Out-Null
    $buf = New-Object byte[] 65536; $left = $end - $start + 1
    while ($left -gt 0) { $n = $fs.Read($buf, 0, [Math]::Min($buf.Length, $left)); if ($n -le 0) { break }; $res.OutputStream.Write($buf, 0, $n); $left -= $n }
    $fs.Close()
  } catch { } finally { try { $res.OutputStream.Close() } catch { } }
}
