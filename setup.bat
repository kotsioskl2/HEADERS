@echo off
echo Starting project setup...

 Install dependencies
npm install

echo Dependencies installed.

 Optional Create an environment variables file if not present
if not exist .env (
    echo NEXT_PUBLIC_API_KEY=your-api-key-here  .env
    echo .env file created.
)

echo Setup complete! Run npm run dev to start the development server.
pause
