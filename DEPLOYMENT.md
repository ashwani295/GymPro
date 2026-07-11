# GymPro Deployment Guide

Use this setup:

- Frontend: Vercel or Netlify
- Backend: Render
- Database: MongoDB Atlas

## 1. MongoDB Atlas

Create a MongoDB Atlas cluster and copy the connection string.

Use a database name like `gympro`.

Example:

```text
mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/gympro
```

Allow network access from your backend host. For a simple Render deployment, Atlas often needs `0.0.0.0/0` in Network Access.

## 2. Backend on Render

Create a new Web Service from your GitHub repo.

Settings:

```text
Root Directory: GymPro/server
Build Command: npm install
Start Command: npm start
```

Environment variables:

```text
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://your-frontend-domain.vercel.app
JWT_SECRET=use_a_long_random_secret
```

After deployment, test:

```text
https://your-backend-domain.onrender.com/api/health
```

## 3. Frontend on Vercel

Settings:

```text
Root Directory: GymPro/client
Build Command: npm run build
Output Directory: dist
```

Environment variable:

```text
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

## 4. Frontend on Netlify

Settings:

```text
Base directory: GymPro/client
Build command: npm run build
Publish directory: GymPro/client/dist
```

Environment variable:

```text
VITE_API_URL=https://your-backend-domain.onrender.com/api
```

The `client/public/_redirects` file is included so React Router pages work after refresh.

## 5. Important

Never commit real `.env` files.

When your frontend URL changes, update backend `CLIENT_URL` and redeploy the backend.

If you use more than one frontend URL, separate them with commas:

```text
CLIENT_URL=https://site.vercel.app,https://site.netlify.app
```
