
# Setup Guide for CollegeXYZ

This document outlines the steps required to set up and run the CollegeXYZ application locally on your machine. The application is built using .NET 6 for the backend and React.js for the frontend.

## Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Entity Framework Core CLI Tools](https://docs.microsoft.com/en-us/ef/core/cli/dotnet) (`dotnet tool install --global dotnet-ef`)
- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [Git](https://git-scm.com/downloads) (for cloning the repository)
- A text editor or IDE (Visual Studio 2022, VS Code, etc.)

## Cloning the Repository

1. Open your command line interface (CLI).
2. Navigate to the directory where you want to clone the repository.
3. Run the following command:
   ```
   git clone https://github.com/LeoulGirma/CollegeXYZ
   ```
4. Change to the project directory:
   ```
   cd CollegeXYZ
   ```

## Setting Up the Application

There are two ways to set up the application: manually or using the `setup.bat` script.

### Option 1: Manual Setup

#### Backend Setup

1. Navigate to the backend project directory (if separate from the root).
2. Restore the required NuGet packages:
   ```
   dotnet restore
   ```
3. Build the backend project:
   ```
   dotnet build
   ```

#### Frontend Setup

1. Navigate to the frontend project directory, typically `ClientApp`:
   ```
   cd ClientApp
   ```
2. Install the required npm packages:
   ```
   npm install
   ```

#### Database Setup

1. Ensure LocalDB is installed and running on your machine (usually installed with Visual Studio).
2. Apply the EF Core migrations to set up the database:
   ```
   dotnet ef database update
   ```

### Option 2: Using `setup.bat` Script

Alternatively, you can use the provided `setup.bat` script to automate the setup process:

1. Ensure you are in the root project directory.
2. Run the `setup.bat` script:
   ```
   setup.bat
   ```

## Running the Application

1. After completing the setup, the application should start automatically.
2. If running manually, return to the root project directory (if you're in the `ClientApp` directory) and run:
   ```
   dotnet run
   ```
3. Open your web browser and navigate to `http://localhost:5000` (or the port specified in your application).

## Additional Information

- If you encounter any issues during the setup, ensure that all prerequisites are correctly installed and the EF Core CLI tools are available.
- For detailed API documentation, navigate to `/swagger` after starting the application.
