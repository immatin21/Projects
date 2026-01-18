<div align="center">

# 🚀 PINGUP

<img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" alt="Version"/>
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
<img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status"/>

### Stay Connected. Share Moments. Build Real Connections.

PingUp is a modern full-stack social media platform where users can connect with people, share posts, chat in real-time, upload 24-hour stories, and follow each other. Built with React, Node.js, MongoDB, and powered by real-time Server-Sent Events (SSE).

**🔗 [Live Demo](https://ping-up-phi-liard.vercel.app)** | **📧 [Contact](mailto:mondalmatin04@gmail.com)**

</div>

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Third-Party Integrations](#-third-party-integrations)
- [Troubleshooting](#-troubleshooting)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🌍 About the Project

PingUp is built with the vision of creating a social space where users can interact without noise and complexity. The platform brings together core features of social networking such as connections, posts, stories, and chatting, but in a clean, responsive, and seamless experience.

### Key Highlights:
- **Real-time messaging** using Server-Sent Events (SSE) - lightweight alternative to WebSockets
- **24-hour disappearing stories** with automatic cleanup via background jobs
- **Secure authentication** powered by Clerk
- **Media optimization** with ImageKit CDN
- **Background job processing** with Inngest for emails and scheduled tasks
- **Fully responsive** design with Tailwind CSS

---

## ✨ Features

### 👥 User Management & Authentication
| Feature | Description |
|---------|-------------|
| Sign Up / Sign In | OAuth integration via Clerk (Google, GitHub, etc.) |
| Profile Management | Update bio, profile photo, cover photo, location |
| User Search | Search users by name, username, email, or location |

### 🤝 Connections & Social Interaction
| Feature | Description |
|---------|-------------|
| Connection Requests | Send, accept, or decline connection requests |
| Follow/Unfollow | Follow users without connection requirement |
| Connection Limit | 20 connection requests per day limit |
| Email Notifications | Automated emails for new connection requests |
| 24-hour Reminders | Reminder emails for pending requests |

### 💬 Real-Time Messaging
| Feature | Description |
|---------|-------------|
| Instant Messaging | Real-time chat powered by SSE |
| Image Sharing | Send images in conversations |
| Read Receipts | Message seen indicators |
| Recent Messages | Quick access to latest conversations |
| Notification Toasts | In-app notifications for new messages |

### 📸 Stories
| Feature | Description |
|---------|-------------|
| Create Stories | Text, image, or video stories |
| Custom Backgrounds | 6 gradient background colors for text stories |
| Auto-Delete | Stories automatically deleted after 24 hours |
| Story Viewer | Full-screen story viewing with progress bar |
| Video Support | Up to 60 seconds, max 50MB |

### 📝 Posts
| Feature | Description |
|---------|-------------|
| Create Posts | Text-only, image-only, or text with images |
| Multiple Images | Upload up to 4 images per post |
| Like System | Like/unlike posts |
| Hashtag Support | Automatic hashtag highlighting |
| Feed Algorithm | Posts from connections and following |

### 📧 Email System
| Feature | Description |
|---------|-------------|
| Connection Request Emails | Beautiful HTML emails for new requests |
| Reminder Emails | 24-hour reminder for pending requests |
| Unseen Messages Digest | Daily digest of unread messages (8 AM) |

---

## 🛠 Tech Stack

<div align="center">

### **Frontend**
| Technology | Purpose | Version |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) | UI Framework | 19.1.1 |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) | Build Tool | 7.1.2 |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white) | Styling | 4.1.13 |
| ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white) | State Management | 2.11.0 |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white) | Routing | 7.9.0 |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white) | HTTP Client | 1.13.2 |
| ![Clerk](https://img.shields.io/badge/Clerk-3C3C3D?logo=clerk&logoColor=white) | Authentication | 5.47.0 |

### **Backend**
| Technology | Purpose | Version |
|------------|---------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) | Runtime | 20.x |
| ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) | Web Framework | 5.1.0 |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white) | Database | - |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white) | ODM | 9.0.0 |
| ![Inngest](https://img.shields.io/badge/Inngest-5A45FF?logo=inngest&logoColor=white) | Background Jobs | 3.46.0 |
| ![ImageKit](https://img.shields.io/badge/ImageKit-29B6F6?logo=imagekit&logoColor=white) | Media Storage | 6.0.0 |
| ![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?logo=nodemailer&logoColor=white) | Email Service | 7.0.11 |

</div>

---

## 🏗 Project Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│  │  Pages  │  │Components│  │  Redux  │  │   API   │            │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘            │
│       └────────────┴───────────┴─────────────┘                  │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS / SSE
┌─────────────────────────────▼───────────────────────────────────┐
│                        SERVER (Express)                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│  │ Routes  │  │Controllers│ │Middleware│  │ Configs │            │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘            │
│       └────────────┴───────────┴─────────────┘                  │
└───────┬─────────────────┬─────────────────┬─────────────────────┘
        │                 │                 │
        ▼                 ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│   MongoDB     │ │   Inngest     │ │   ImageKit    │
│   (Database)  │ │ (Background)  │ │   (Media)     │
└───────────────┘ └───────────────┘ └───────────────┘
```

### Data Flow

1. **Authentication Flow**
   ```
   User Sign Up → Clerk → Webhook → Inngest → MongoDB (User Created)
   ```

2. **Real-Time Messaging Flow**
   ```
   User A sends message → API → MongoDB → SSE → User B receives instantly
   ```

3. **Story Lifecycle**
   ```
   Create Story → MongoDB → Inngest schedules deletion → 24hrs → Auto-deleted
   ```

---

## 📊 Database Schema

### User Model
```javascript
{
  _id: String,           // Clerk User ID
  email: String,         // Required
  full_name: String,     // Required
  username: String,      // Unique
  bio: String,           // Default: "Hey there! I am using PingUp."
  profile_picture: String,
  cover_picture: String,
  location: String,
  followers: [String],   // User IDs
  following: [String],   // User IDs
  connections: [String], // User IDs (mutual connections)
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  user: String,          // Ref: User
  content: String,
  image_urls: [String],
  post_type: String,     // 'text' | 'image' | 'textwithimage'
  likes_count: [String], // User IDs who liked
  createdAt: Date,
  updatedAt: Date
}
```

### Story Model
```javascript
{
  user: String,          // Ref: User
  content: String,
  media_urls: String,
  media_type: String,    // 'text' | 'image' | 'video'
  views_count: [String], // User IDs who viewed
  background_colour: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  from_user_id: String,  // Ref: User
  to_user_id: String,    // Ref: User
  text: String,
  message_type: String,  // 'text' | 'image'
  media_url: String,
  seen: Boolean,         // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

### Connection Model
```javascript
{
  from_user_id: String,  // Ref: User
  to_user_id: String,    // Ref: User
  status: String,        // 'Pending' | 'Accepted'
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📡 API Documentation

### Base URL
```
Production: https://pingup-server-chi-two.vercel.app
Development: http://localhost:4000
```

### Authentication
All protected routes require Bearer token in headers:
```
Authorization: Bearer <clerk_token>
```

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/data` | Get current user data | ✅ |
| POST | `/update` | Update user profile | ✅ |
| POST | `/discover` | Search users | ✅ |
| POST | `/follow` | Follow a user | ✅ |
| POST | `/unfollow` | Unfollow a user | ✅ |
| POST | `/connect` | Send connection request | ✅ |
| POST | `/accept` | Accept connection request | ✅ |
| POST | `/remove-connections` | Remove connection | ✅ |
| GET | `/connections` | Get all connections | ✅ |
| POST | `/profiles` | Get user profile by ID | ❌ |
| GET | `/recent-messages` | Get recent messages | ✅ |

### Post Routes (`/api/post`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create new post | ✅ |
| GET | `/feed` | Get feed posts | ✅ |
| POST | `/like` | Like/unlike post | ✅ |

### Story Routes (`/api/story`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/add` | Create new story | ✅ |
| GET | `/get` | Get stories feed | ✅ |

### Message Routes (`/api/message`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/send` | Send message | ✅ |
| POST | `/get` | Get chat messages | ✅ |
| GET | `/:userId` | SSE connection for real-time | ❌ |

### Inngest Routes (`/api/inngest`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/` | Inngest webhook endpoint |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** Atlas account or local instance
- **Clerk** account for authentication
- **ImageKit** account for media storage
- **Inngest** account for background jobs
- **Brevo/Sendinblue** account for emails (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pingup.git
   cd pingup
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables** (see below)

5. **Start development servers**

   **Terminal 1 - Server:**
   ```bash
   cd server
   npm run server
   ```

   **Terminal 2 - Client:**
   ```bash
   cd client
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

### Environment Variables

#### Server (`server/.env`)
```env
# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# ImageKit Media Storage
IMAGEKIT_PUBLIC_KEY=public_xxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Inngest Background Jobs
INNGEST_EVENT_KEY=evt_xxxxx
INNGEST_SIGNING_KEY=signkey-xxxxx

# Email (Brevo SMTP)
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SENDER_EMAIL=noreply@yourdomain.com

# Frontend URL (for CORS & emails)
FRONTEND_URL=http://localhost:5173
```

#### Client (`client/.env`)
```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx

# Backend API URL
VITE_BASEURL=http://localhost:4000
```

---

## 🌐 Deployment

### Deploying to Vercel

#### 1. Deploy Server

```bash
cd server
vercel
```

**Environment Variables to add in Vercel Dashboard:**
- `MONGODB_URL`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_PRIVATE_KEY`
- `IMAGEKIT_URL_ENDPOINT`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`
- `SMTP_USER`
- `SMTP_PASS`
- `SENDER_EMAIL`
- `FRONTEND_URL` (your client's Vercel URL)

#### 2. Deploy Client

```bash
cd client
vercel
```

**Environment Variables to add in Vercel Dashboard:**
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_BASEURL` (your server's Vercel URL)

#### 3. Configure Clerk Webhooks

1. Go to [Clerk Dashboard](https://dashboard.clerk.com) → Webhooks
2. Add endpoint: `https://your-server.vercel.app/api/inngest`
3. Subscribe to events:
   - `user.created`
   - `user.updated`
   - `user.deleted`

#### 4. Configure Inngest

1. Go to [Inngest Dashboard](https://app.inngest.com)
2. Verify your app is receiving events
3. Check function runs for any errors

---

## 📸 Screenshots

<div align="center">

| Sign In | Feed & Stories |
|:-------:|:--------------:|
| ![Sign In](screenshots/Sign-In%20Page.png) | ![Feed](screenshots/Feed.png) |

| Create Post | Discover People |
|:-----------:|:---------------:|
| ![Post](screenshots/Post%20Page.png) | ![Discover](screenshots/Discover.png) |

| Profile | Connections |
|:-------:|:-----------:|
| ![Profile](screenshots/Profile.png) | ![Connections](screenshots/Connections.png) |

| Messages | Chat |
|:--------:|:----:|
| ![Messages](screenshots/Messages.png) | ![Chat](screenshots/Chat%20page.png) |

</div>

---

## 📁 Project Structure

```
Social-App/
├── client/                    # Frontend React Application
│   ├── public/               # Static assets
│   │   ├── favicon.svg
│   │   └── vite.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js      # Axios instance configuration
│   │   ├── app/
│   │   │   └── store.js      # Redux store configuration
│   │   ├── assets/
│   │   │   ├── assets.js     # Asset exports & dummy data
│   │   │   └── *.png/svg     # Images and icons
│   │   ├── components/
│   │   │   ├── Loading.jsx       # Loading spinner
│   │   │   ├── MenuItems.jsx     # Sidebar menu items
│   │   │   ├── Notification.jsx  # Toast notification
│   │   │   ├── PostCards.jsx     # Post card component
│   │   │   ├── ProfileModal.jsx  # Edit profile modal
│   │   │   ├── RecentMessages.jsx# Recent messages sidebar
│   │   │   ├── Sidebar.jsx       # Main sidebar navigation
│   │   │   ├── StoriesBar.jsx    # Stories carousel
│   │   │   ├── StoryModal.jsx    # Create story modal
│   │   │   ├── StoryViewer.jsx   # View story fullscreen
│   │   │   ├── UserCard.jsx      # User card for discover
│   │   │   └── UserProfileInfo.jsx # Profile info section
│   │   ├── features/
│   │   │   ├── connections/
│   │   │   │   └── connectionsSlice.js  # Connections state
│   │   │   ├── messages/
│   │   │   │   └── messagesSlice.js     # Messages state
│   │   │   └── user/
│   │   │       └── userSlice.js         # User state
│   │   ├── pages/
│   │   │   ├── ChatBox.jsx       # Individual chat page
│   │   │   ├── Connections.jsx   # Connections management
│   │   │   ├── CreatePost.jsx    # Create new post
│   │   │   ├── Discover.jsx      # Search/discover users
│   │   │   ├── Feed.jsx          # Main feed page
│   │   │   ├── Layout.jsx        # App layout wrapper
│   │   │   ├── Login.jsx         # Login/signup page
│   │   │   ├── Messages.jsx      # Messages list page
│   │   │   └── Profile.jsx       # User profile page
│   │   ├── App.jsx               # Main app component
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # App entry point
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vercel.json              # Vercel deployment config
│   └── vite.config.js
│
├── server/                    # Backend Node.js Application
│   ├── configs/
│   │   ├── db.js             # MongoDB connection
│   │   ├── imageKit.js       # ImageKit configuration
│   │   ├── multer.js         # File upload configuration
│   │   └── nodeMailer.js     # Email configuration
│   ├── controllers/
│   │   ├── messageController.js  # Message & SSE logic
│   │   ├── postController.js     # Post CRUD operations
│   │   ├── storyController.js    # Story CRUD operations
│   │   └── userController.js     # User & connection logic
│   ├── inngest/
│   │   └── index.js          # Background job functions
│   ├── middlewares/
│   │   └── auth.js           # Authentication middleware
│   ├── models/
│   │   ├── Connection.js     # Connection schema
│   │   ├── Message.js        # Message schema
│   │   ├── Post.js           # Post schema
│   │   ├── Story.js          # Story schema
│   │   └── User.js           # User schema
│   ├── routes/
│   │   ├── messageRoutes.js  # Message API routes
│   │   ├── postRoutes.js     # Post API routes
│   │   ├── storyRoutes.js    # Story API routes
│   │   └── userRoutes.js     # User API routes
│   ├── .gitignore
│   ├── package.json
│   ├── server.js             # Express server entry
│   └── vercel.json           # Vercel deployment config
│
├── screenshots/              # App screenshots
├── .gitignore
└── readme.md                 # This file
```

---

## 🔌 Third-Party Integrations

### Clerk (Authentication)
- **Purpose:** User authentication & management
- **Setup:** 
  1. Create app at [clerk.com](https://clerk.com)
  2. Get API keys
  3. Configure OAuth providers (Google, GitHub, etc.)
  4. Set up webhooks for user sync

### ImageKit (Media Storage)
- **Purpose:** Image/video storage & CDN
- **Setup:**
  1. Create account at [imagekit.io](https://imagekit.io)
  2. Get API credentials
  3. Configure transformations for optimization

### Inngest (Background Jobs)
- **Purpose:** Scheduled tasks & event-driven functions
- **Functions:**
  - `sync-user-from-clerk` - Create user on signup
  - `update-user-from-clerk` - Sync profile updates
  - `delete-user-with-clerk` - Clean up on deletion
  - `send-new-connection-request-reminder` - Email notifications
  - `story-delete` - Auto-delete stories after 24h
  - `send-unseen-messages-notification` - Daily digest

### Brevo/Sendinblue (Email)
- **Purpose:** Transactional emails
- **Setup:**
  1. Create account at [brevo.com](https://brevo.com)
  2. Get SMTP credentials
  3. Verify sender domain

---

## 🔧 Troubleshooting

### Common Issues

#### 1. "User not found" / Infinite loading for new users
**Cause:** Clerk webhook not configured properly
**Solution:**
- Verify webhook URL: `https://your-server/api/inngest`
- Check subscribed events: `user.created`, `user.updated`, `user.deleted`
- Verify Inngest environment variables

#### 2. CORS Error
**Cause:** `FRONTEND_URL` not set correctly
**Solution:**
- Set `FRONTEND_URL` in Vercel to your client URL
- Redeploy server

#### 3. Inngest 401 Error
**Cause:** Missing or incorrect Inngest keys
**Solution:**
- Add `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` to Vercel
- Get keys from Inngest dashboard

#### 4. MongoDB Duplicate Key Error
**Cause:** Old indexes from previous schema
**Solution:**
- Drop the conflicting index in MongoDB Atlas
- Delete documents with null required fields

#### 5. Emails Not Sending
**Cause:** SMTP configuration issues
**Solution:**
- Verify `SMTP_USER`, `SMTP_PASS`, `SENDER_EMAIL`
- Check Brevo account for sending limits

---

## 🔮 Future Roadmap

- [ ] Voice / Video calling support
- [ ] Comments on posts
- [ ] Share/Repost functionality
- [ ] Story reactions (emoji responses)
- [ ] AI-powered content suggestions
- [ ] Push notifications (PWA)
- [ ] Group chats
- [ ] Post scheduling
- [ ] Analytics dashboard
- [ ] Dark mode

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Code Style
- Use ESLint configuration provided
- Follow existing code patterns
- Add comments for complex logic
- Test thoroughly before PR

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` file for details.

---

## 📩 Contact

**Matin Mondal** - Developer

- 📧 Email: [mondalmatin04@gmail.com](mailto:mondalmatin04@gmail.com)
- 🔗 GitHub: [@immatin21](https://github.com/immatin21)
- 🌐 Live Demo: [ping-up-phi-liard.vercel.app](https://ping-up-phi-liard.vercel.app)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**PingUp – Stay Connected**

Made with ❤️ by Matin Mondal

</div>
