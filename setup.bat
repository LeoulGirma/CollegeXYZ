@echo off
SETLOCAL ENABLEEXTENSIONS
SET solution_name=CollegeXYZ.sln
SET startup_project=CollegeXYZ.Server

echo Starting setup process...

echo Restoring NuGet packages...
dotnet restore %solution_name% || (
    echo ERROR: Failed to restore NuGet packages.
    exit /b 1
)

echo Building the solution...
dotnet build %solution_name% --no-restore || (
    echo ERROR: Build failed.
    exit /b 1
)

echo Applying database migrations...
dotnet ef database update --project %startup_project% || (
    echo ERROR: Database migration failed.
    exit /b 1
)

echo Starting the application...
dotnet run --project %startup_project% || (
    echo ERROR: Failed to start the application.
    exit /b 1
)

echo Setup completed successfully.
pause
ENDLOCAL
