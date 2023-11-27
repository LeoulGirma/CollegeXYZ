@echo off
SETLOCAL ENABLEEXTENSIONS
SET solution_name=CollegeXYZ.sln
SET startup_project=CollegeXYZ.Server
SET react_project_path=collegeXYZ.client

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

echo Starting the .NET application in a new window...
start cmd /k dotnet run --project %startup_project% || (
    echo ERROR: Failed to start the .NET application.
    exit /b 1
)

echo Setting up and starting React project in a new window...
start cmd /k "cd %react_project_path% && npm install && npm run dev" || (
    echo ERROR: Failed to start React project.
    exit /b 1
)

echo Setup completed successfully.
pause
ENDLOCAL
