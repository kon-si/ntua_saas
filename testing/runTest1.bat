@echo off
For /f "tokens=1-4 delims=/ " %%a in ('date /t') do (set testdate=%%c-%%b-%%a)
For /f "tokens=1-2 delims=/:/ " %%a in ('time /t') do (set testtime=%%a-%%b)
set arg1=%1
jmeter.bat -Jdate=%testdate% -Jtime=%testtime% -n -t %arg1%