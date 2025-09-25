# Deploying OutfitHub-Ecommerce backend to Render

This document explains how to deploy the backend to Render.com. It assumes your repository is already pushed to GitHub and you have a Render account.

1) Environment variables (set in Render dashboard for the service):
   - MONGO_URI: your MongoDB connection string
   - JWT_SECRET: secret used to sign JWT tokens
   - NODE_ENV: production

2) Create a new Web Service on Render:
   - Connect your GitHub repo.
   - Select `d:\E commerce\backend` as the project root (or the repo root if backend is top-level).
   - Build command: `npm install`
   - Start command: `npm start` (we add start script below)
   - Set the environment variables in the Render dashboard.

3) Static files and uploads:
   - This service stores uploads in `/uploads` on the instance; for production you should use S3 or another persistent store. Render instances have ephemeral disks.
   - Update multer storage to upload to S3 or remote storage for production.

4) After deploy:
   - Get the public URL from Render and update the frontend to call the API URL (or set it in the frontend environment).

Notes:
- For full-stack deployment, consider deploying frontend separately with Render static site or any other static host, and set the API_BASE_URL in the frontend to the backend URL.
- If you want, I can prepare a deployment-ready `Dockerfile` or S3 upload integration.
