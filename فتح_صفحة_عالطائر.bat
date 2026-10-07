@echo off
chcp 65001 > nul
echo جاري فتح صفحة عالطائر في المتصفح...
start "" "%~dp0index.html"
exit
