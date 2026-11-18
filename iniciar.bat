@echo off
title El Dia Mas Especial - Servidor Local
echo ========================================================
echo  Iniciando: EL DIA MAS ESPECIAL
echo ========================================================
where py >nul 2>nul && (py "%~dp0server.py" & goto fin)
where python >nul 2>nul && (python "%~dp0server.py" & goto fin)
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
:fin
pause
