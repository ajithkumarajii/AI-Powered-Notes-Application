# Environment Setup Guide

## Prerequisites

Before running the backend, ensure you have:

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **MongoDB** (local or cloud)
   - Local: https://www.mongodb.com/try/download/community
   - Cloud (Recommended): https://www.mongodb.com/cloud/atlas (free tier available)

---

## Step 1: Local MongoDB Setup (Optional)

### On Windows

1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer (MSI file)
3. Keep default settings and install MongoDB
4. MongoDB will start as a Windows service automatically
5. Verify it's running:
   ```bash
   mongod --version
   ```

### On Mac

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### On Linux (Ubuntu)

```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

---

## Step 2: MongoDB Atlas Setup (Cloud - Recommended)

### Create Free MongoDB Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project
4. Create a new cluster (free tier: M0)
5. Create a database user:
   - Username: `admin`
   - Password: Generate secure password
6. Whitelist your IP:
   - Click "Network Access"
   - Add your current IP or 0.0.0.0/0 for development
7. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

Connection string format:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

---

## Step 3: Configure Environment Variables

### Option A: Local MongoDB

Create `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-notes-app
JWT_SECRET=dev_secret_key_123_change_in_production
NODE_ENV=development
```

### Option B: MongoDB Atlas

Create `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ai-notes-app?retryWrites=true&w=majority
JWT_SECRET=dev_secret_key_123_change_in_production
NODE_ENV=development
```

Replace:
- `YOUR_PASSWORD` - Your MongoDB Atlas password
- `cluster0.xxxxx` - Your actual cluster address

---

## Step 4: Verify MongoDB Connection

### Test Local Connection

```bash
mongo
```

or newer versions:

```bash
mongosh
```

You should see the MongoDB shell prompt: `>`

### Test Atlas Connection

Use MongoDB Compass:

1. Download from: https://www.mongodb.com/products/compass
2. Paste your connection string
3. Click "Connect"

---

## Step 5: Install Backend Dependencies

```bash
cd backend
npm install
```

You should see all dependencies being installed.

---

## Step 6: Start the Backend Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

Expected output:
```
Server is running on http://localhost:5000
MongoDB connected successfully
```

### Production Mode

```bash
npm start
```

---

## Step 7: Verify Setup

### Test Health Endpoint

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "message": "Server is running"
}
```

### Check MongoDB Connection

If you see "MongoDB connected successfully" in the console, you're good to go!

---

## Troubleshooting

### Issue: "MongoDB connection failed"

**Solution 1: Local MongoDB not running**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Solution 2: MongoDB Atlas connection string incorrect**
- Double-check username and password
- Ensure your IP is whitelisted
- Check database name in connection string

### Issue: "Port 5000 already in use"

**Solution 1: Change port in .env**
```env
PORT=5001
```

**Solution 2: Kill process using port 5000**
```bash
# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: "Cannot find module 'express'"

**Solution:** Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "JWT_SECRET not found"

**Solution:** Ensure .env file exists in backend folder with JWT_SECRET:
```env
JWT_SECRET=your_secret_key_here
```

---

## Environment Variables Reference

| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| PORT | Server port | 5000 | Yes |
| MONGO_URI | MongoDB connection | mongodb://localhost:27017/... | Yes |
| JWT_SECRET | JWT signing secret | your_secret_key | Yes |
| NODE_ENV | Environment mode | development / production | No |

---

## Security Best Practices

### Development
```env
JWT_SECRET=dev_secret_123
MONGO_URI=mongodb://localhost:27017/ai-notes-app
```

### Production (Never commit these!)
```env
JWT_SECRET=super_secret_long_random_string_with_numbers_and_symbols
MONGO_URI=mongodb+srv://secure_user:secure_password@cluster.mongodb.net/production-db?retryWrites=true&w=majority
NODE_ENV=production
```

⚠️ **Important:**
- Never commit `.env` file to git
- Use `.gitignore` to exclude it
- Change JWT_SECRET for production
- Use strong passwords for MongoDB

---

## Database Configuration

### Local MongoDB
- **Host:** localhost
- **Port:** 27017 (default)
- **Connection:** `mongodb://localhost:27017/database_name`

### MongoDB Atlas
- **Type:** Cloud-hosted
- **Free Tier:** M0 cluster
- **Connection:** Use SRV connection string
- **Performance:** Slower for development, good for production

---

## Quick Start Script

### One-liner for full setup:

```bash
# 1. Navigate to project
cd 'a:\AI Powered Notes Application'

# 2. Navigate to backend
cd backend

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

---

## Next Steps

1. ✅ Verify environment setup with `npm run dev`
2. ✅ Test API with curl or Postman
3. ✅ Create sample user with signup endpoint
4. ✅ Test note creation and retrieval
5. ✅ Verify ownership validation works

See `API_TESTING.md` for detailed testing examples.

---

## Additional Resources

- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/
- Express Docs: https://expressjs.com/
- JWT Docs: https://jwt.io/
- bcrypt Docs: https://github.com/kelektiv/node.bcrypt.js

---

Ready to start developing! 🚀
