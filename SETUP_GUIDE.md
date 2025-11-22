# 🎯 Quick Setup Guide

## What You Need to Do Now

Follow these steps to get your FileShare app running:

---

## 1️⃣ Create `.env.local` File

Create a new file called `.env.local` in the root directory and add these variables:

```env
# MongoDB - Get from MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fileshare?retryWrites=true&w=majority

# NextAuth - Generate secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Google OAuth - Get from Google Cloud Console
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary - Get from Cloudinary Dashboard
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 2️⃣ Get MongoDB URI

### Option A: MongoDB Atlas (Free Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free
3. Create a **FREE cluster** (M0 Sandbox)
4. Click **"Connect"**
5. Choose **"Connect your application"**
6. Copy the connection string
7. Replace `<password>` with your database user password
8. Paste into `MONGODB_URI` in `.env.local`

**Example:**
```
mongodb+srv://john:mypassword123@cluster0.abc123.mongodb.net/fileshare?retryWrites=true&w=majority
```

---

## 3️⃣ Generate NextAuth Secret

Run this command in your terminal:

```bash
openssl rand -base64 32
```

Copy the output and paste it into `NEXTAUTH_SECRET` in `.env.local`

---

## 4️⃣ Get Google OAuth Credentials

1. Go to https://console.cloud.google.com/
2. Create a **new project** (or select existing)
3. Enable **Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. Create **OAuth Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Application type: **Web application**
   - Authorized redirect URIs: Add these:
     - `http://localhost:3000/api/auth/callback/google`
     - `http://localhost:3000` (optional)
5. Copy **Client ID** and **Client Secret**
6. Paste into `.env.local`

---

## 5️⃣ Get Cloudinary Credentials

1. Go to https://cloudinary.com/
2. Sign up for **FREE account**
3. Go to your **Dashboard**
4. You'll see:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
5. Copy all three and paste into `.env.local`

---

## 6️⃣ Run the App

Once all environment variables are set:

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

---

## ✅ Verification Checklist

Before running, make sure:

- [ ] `.env.local` file exists in root directory
- [ ] `MONGODB_URI` is filled with valid connection string
- [ ] `NEXTAUTH_SECRET` is generated and filled
- [ ] `NEXTAUTH_URL` is set to `http://localhost:3000`
- [ ] `GOOGLE_CLIENT_ID` is filled
- [ ] `GOOGLE_CLIENT_SECRET` is filled
- [ ] `CLOUDINARY_CLOUD_NAME` is filled
- [ ] `CLOUDINARY_API_KEY` is filled
- [ ] `CLOUDINARY_API_SECRET` is filled

---

## 🆘 Troubleshooting

### "MongoDB connection failed"
- Check your MongoDB URI format
- Verify your database password is correct
- Whitelist your IP address in MongoDB Atlas (Network Access)

### "Google OAuth not working"
- Verify redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- Check Client ID and Secret are correct
- Make sure Google+ API is enabled

### "Cloudinary upload fails"
- Check all three Cloudinary credentials are correct
- Ensure no extra spaces in credentials
- Verify your Cloudinary account is active

---

## 📞 Need Help?

1. Check the full `README.md` for detailed documentation
2. Review the `.env.local.example` file for reference
3. All credentials are free to obtain!

---

**Estimated Setup Time:** 15-20 minutes

Once setup is complete, you'll have a fully functional file-sharing platform! 🎉


