# 🚀 FileShare - Modern File Sharing Platform

A modern, full-stack file-sharing platform built with Next.js 15, MongoDB, and Cloudinary. Upload, share, and manage files securely with ease.

## ✨ Features

- 🎯 **Drag-and-Drop Upload** - Intuitive file upload with progress tracking
- ☁️ **Cloudinary Storage** - Reliable cloud storage with CDN delivery
- 🔐 **NextAuth Authentication** - Secure Google OAuth & Email login
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🔗 **Shareable Links** - Instant shareable URLs for all uploads
- 📊 **Storage Dashboard** - Track your files and storage usage
- 🎨 **Modern UI** - Clean, gradient-based design with smooth animations
- 🔒 **Secure Downloads** - Time-limited signed URLs for downloads
- 📁 **File Management** - Filter, preview, and delete files easily
- 💾 **3GB Storage** - Free storage limit per user

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB with Mongoose
- **Storage:** Cloudinary
- **Authentication:** NextAuth.js
- **Validation:** Zod
- **Icons:** React Icons
- **HTTP Client:** Axios
- **File Upload:** React Dropzone

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account
- Google Cloud Console project (for OAuth)

## 🚀 Setup Instructions

### 1. Clone and Install

```bash
cd file-sharing-web-app
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then fill in your credentials:

```env
# MongoDB
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/fileshare?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Get Your Credentials

#### MongoDB URI
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

#### NextAuth Secret
Generate a secure secret:
```bash
openssl rand -base64 32
```

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret

#### Cloudinary
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
file-sharing-web-app/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth routes
│   │   ├── upload/              # File upload endpoint
│   │   ├── file/                # Get file metadata + signed URL
│   │   ├── files/               # List user files
│   │   └── delete/              # Delete file endpoint
│   ├── upload/                  # Upload page (protected)
│   ├── files/                   # Files dashboard (protected)
│   ├── file/[id]/               # Public file view/download
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   ├── Navbar.tsx               # Navigation bar
│   ├── DropzoneUploader.tsx     # File upload component
│   ├── FileCard.tsx             # File card with actions
│   └── SessionWrapper.tsx       # NextAuth session provider
├── lib/
│   ├── db.ts                    # MongoDB connection
│   ├── cloudinary.ts            # Cloudinary config
│   ├── authOptions.ts           # NextAuth configuration
│   ├── mongodb-adapter.ts       # MongoDB adapter for NextAuth
│   └── utils.ts                 # Helper functions
├── models/
│   └── File.ts                  # File model schema
├── types/
│   └── file.ts                  # TypeScript types
└── .env.local.example           # Environment template
```

## 🎯 Usage

### For Users

1. **Sign In** - Click "Sign In" and authenticate with Google
2. **Upload** - Go to Upload page, drag and drop a file
3. **Share** - Copy the shareable link
4. **Manage** - View all your files in the dashboard
5. **Delete** - Remove files you no longer need

### For Recipients

1. Open the shared link
2. Preview the file (images, videos, PDFs)
3. Download the file

## 🔒 Security Features

- **Authentication Required** - Upload and management routes are protected
- **Signed URLs** - Download links expire after 10 minutes
- **File Type Validation** - Only allowed file types can be uploaded
- **Size Limits** - 100MB max per file
- **Storage Limits** - 3GB total per user
- **Ownership Validation** - Users can only delete their own files

## 📊 Supported File Types

- **Images:** JPEG, PNG, GIF, WebP, SVG
- **Documents:** PDF, DOCX, DOC, XLSX, XLS, TXT, CSV
- **Audio:** MP3, WAV, OGG, WebM
- **Video:** MP4, MPEG, QuickTime, AVI, WebM
- **Archives:** ZIP, RAR

## 🎨 Color Palette

- Dark Background: `#000814`
- Dark Accent: `#001d3d`
- Primary Blue: `#003566`
- Accent Yellow: `#ffc300`
- Bright Yellow: `#ffd60a`
- White: `#ffffff`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Make sure to:
- Set all environment variables
- Set `NEXTAUTH_URL` to your production URL
- Update Google OAuth redirect URIs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas
- Check your connection string format
- Verify database user credentials

### Google OAuth Not Working
- Check redirect URIs in Google Cloud Console
- Ensure `NEXTAUTH_URL` matches your domain
- Verify Client ID and Secret are correct

### Cloudinary Upload Fails
- Check API credentials
- Verify file type is allowed
- Ensure file size is under 100MB

### NextAuth Session Issues
- Ensure `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again
- Check that MongoDB adapter is working

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, MongoDB, and Cloudinary
