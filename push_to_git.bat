@echo off
REM Git Push Batch Script
echo Starting git push process...

REM Add all changes
echo Adding all changes...
git add .

REM Prompt for commit message
set /p commit_msg="Enter commit message: "
if "%commit_msg%"=="" (
    echo No commit message provided. Using default message.
    git commit -m "Update files"
) else (
    git commit -m "%commit_msg%"
)

REM Push current branch to origin
echo Pushing to remote...
git push origin master

echo.
echo Git push completed!
echo.
pause
