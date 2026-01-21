# How to Run the Project

## Quick Start

Due to PowerShell execution policy restrictions, use one of these methods:

### Method 1: Use the Batch File (Easiest)
Double-click `run-dev.bat` or run:
```cmd
run-dev.bat
```

### Method 2: Use Command Prompt (CMD)
Open Command Prompt (not PowerShell) and run:
```cmd
npm run dev
```

### Method 3: Use PowerShell with Bypass
In PowerShell, run:
```powershell
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

### Method 4: Use npx directly
```cmd
npx next dev
```

## Access the Website

Once the server starts, you'll see:
```
Local: http://localhost:3000
```

Open that URL in your browser.

## Other Useful Commands

- **Build for production**: `npm run build`
- **Start production server**: `npm start`
- **Install dependencies**: `npm install`

## Troubleshooting

If you get "npm is not recognized":
1. Close and reopen your terminal
2. Or manually refresh PATH: 
   ```powershell
   $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
   ```
