# 📸 Pixinity

> **A humanitarian photography platform dedicated to documenting truth, preserving evidence, and amplifying voices for justice.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

---

## 🌟 Overview

**Pixinity** is more than just a photography platform—it's a powerful tool for humanitarian documentation and social justice. Born from the need to preserve truth and amplify voices, Pixinity serves as a digital archive for evidence, testimonies, and visual documentation of civilian experiences, particularly focusing on the ongoing crisis in Gaza.

Our platform combines cutting-edge technology with a deep commitment to human rights, providing a secure, accessible, and multilingual space for photographers, journalists, survivors, and advocates to share their stories and preserve crucial evidence for accountability efforts.

### 🎯 Mission Statement

*"To create an unbreakable digital archive of truth, where every image tells a story, every testimony matters, and every voice contributes to the pursuit of justice and accountability."*

---

## ✨ Key Features

### 🔐 **Evidence Documentation**
- **Secure Upload System**: Multi-file upload with automatic image processing and optimization
- **Metadata Preservation**: Maintains EXIF data and location information for legal authenticity
- **Content Verification**: Built-in systems for verifying and authenticating submitted evidence
- **Legal-Grade Storage**: Tamper-proof storage solutions designed for legal proceedings

### 🗣️ **Testimony Collection**
- **Survivor Stories**: Dedicated platform for collecting and preserving personal testimonies
- **Multi-format Support**: Text, audio, video, and image testimonies
- **Privacy Protection**: Advanced privacy controls to protect vulnerable individuals
- **Translation Services**: Automatic translation capabilities for global accessibility

### 🌍 **Global Accessibility**
- **Multi-language Support**: Available in 6 languages (English, Spanish, French, German, Chinese, Arabic)
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Accessibility Compliance**: WCAG 2.1 AA compliant for users with disabilities
- **Offline Capabilities**: Progressive Web App features for areas with limited connectivity

### 📊 **Advanced Analytics**
- **Impact Tracking**: Monitor reach, engagement, and global awareness metrics
- **Geographic Insights**: Understand global distribution of content and engagement
- **Content Performance**: Track which stories and evidence gain the most attention
- **Legal Usage Analytics**: Monitor how content is being used in legal proceedings

### 🤝 **Community Features**
- **Collaborative Collections**: Create shared collections with other users and organizations
- **Verification Network**: Community-driven content verification system
- **Expert Partnerships**: Integration with legal experts, journalists, and human rights organizations
- **Educational Resources**: Built-in resources about documentation best practices

---

## 🏗️ Architecture & Technology Stack

### **Frontend Architecture**
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React/Next.js)               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Pages     │  │ Components  │  │    Hooks    │        │
│  │             │  │             │  │             │        │
│  │ • HomePage  │  │ • PhotoGrid │  │ • useAuth   │        │
│  │ • Explore   │  │ • Header    │  │ • useUpload │        │
│  │ • Profile   │  │ • Modals    │  │ • useToast  │        │
│  │ • Collections│ │ • Forms     │  │ • useMobile │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│                    State Management                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Context   │  │    SWR      │  │ Local State │        │
│  │             │  │             │  │             │        │
│  │ • AuthCtx   │  │ • API Cache │  │ • Forms     │        │
│  │ • ThemeCtx  │  │ • Real-time │  │ • UI State  │        │
│  │ • LangCtx   │  │ • Mutations │  │ • Filters   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### **Backend Architecture**
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Node.js/Express)                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Routes    │  │ Middleware  │  │  Services   │        │
│  │             │  │             │  │             │        │
│  │ • Auth      │  │ • CORS      │  │ • Email     │        │
│  │ • Photos    │  │ • Auth      │  │ • Upload    │        │
│  │ • Users     │  │ • Upload    │  │ • Image     │        │
│  │ • Collections│ │ • Rate Limit│  │ • Analytics │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Database  │  │ File Storage│  │    Cache    │        │
│  │             │  │             │  │             │        │
│  │ • MySQL     │  │ • Local FS  │  │ • Redis     │        │
│  │ • Connection│  │ • CDN       │  │ • Sessions  │        │
│  │ • Pooling   │  │ • Backups   │  │ • API Cache │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### **Core Technologies**

#### **Frontend Stack**
- **⚛️ React 19**: Latest React with concurrent features and improved performance
- **🔄 Next.js 14.2**: Full-stack React framework with App Router and server components
- **📘 TypeScript 5.7**: Type-safe development with latest language features
- **🎨 Tailwind CSS 3.4**: Utility-first CSS framework for rapid UI development
- **🧩 Radix UI**: Unstyled, accessible UI primitives for consistent design system
- **📊 Recharts 2.15**: Composable charting library for data visualization
- **🎭 Framer Motion**: Production-ready motion library for React animations

#### **Backend Stack**
- **🟢 Node.js**: JavaScript runtime for server-side development
- **🚀 Express.js**: Fast, unopinionated web framework for Node.js
- **🗄️ MySQL**: Reliable relational database for structured data
- **📧 Nodemailer**: Email sending capabilities for notifications
- **🖼️ Sharp**: High-performance image processing library
- **🔐 bcrypt**: Secure password hashing and authentication

#### **Development & Deployment**
- **📦 npm/yarn**: Package management and dependency resolution
- **🔧 ESLint**: Code linting and quality enforcement
- **🎯 Prettier**: Code formatting and style consistency
- **🐳 Docker**: Containerization for consistent deployment
- **☁️ Vercel**: Deployment platform optimized for Next.js applications

---

## 🚀 Quick Start Guide

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/)
- **Git** - [Download here](https://git-scm.com/downloads)

### **Installation Steps**

#### 1. **Clone the Repository**
\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/pixinity.git

# Navigate to the project directory
cd pixinity

# Check the project structure
ls -la
\`\`\`

#### 2. **Install Dependencies**
\`\`\`bash
# Install frontend dependencies
npm install

# Or using yarn
yarn install

# Install backend dependencies (if separate)
cd server && npm install
cd ..
\`\`\`

#### 3. **Environment Configuration**

Create environment files for both development and production:

\`\`\`bash
# Create environment files
cp .env.example .env.local
cp server/.env.example server/.env
\`\`\`

**Frontend Environment Variables** (`.env.local`):
\`\`\`env
# Application Configuration
NEXT_PUBLIC_APP_NAME=Pixinity
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Authentication
NEXTAUTH_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=mysql://username:password@localhost:3306/pixinity

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Feature Flags
NEXT_PUBLIC_ENABLE_TESTIMONIES=true
NEXT_PUBLIC_ENABLE_COLLECTIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
\`\`\`

**Backend Environment Variables** (`server/.env`):
\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pixinity
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_CONNECTION_LIMIT=10

# Authentication
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d
SESSION_SECRET=your-session-secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@pixinity.org
FROM_NAME=Pixinity Platform

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp,gif

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# External Services
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
\`\`\`

#### 4. **Database Setup**

\`\`\`bash
# Create the database
mysql -u root -p -e "CREATE DATABASE pixinity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Run database migrations
npm run db:migrate

# Seed the database with initial data
npm run db:seed
\`\`\`

#### 5. **Start Development Servers**

\`\`\`bash
# Terminal 1: Start the backend server
cd server
npm run dev

# Terminal 2: Start the frontend development server
npm run dev
\`\`\`

#### 6. **Verify Installation**

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

You should see the Pixinity homepage and a successful API health check.

### **Docker Setup (Alternative)**

For a containerized setup:

\`\`\`bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
\`\`\`

---

## 📁 Project Structure

\`\`\`
pixinity/
├── 📁 app/                          # Next.js App Router pages
│   ├── 📄 layout.tsx               # Root layout component
│   ├── 📄 page.tsx                 # Homepage
│   ├── 📄 globals.css              # Global styles
│   ├── 📁 explore/                 # Explore page
│   ├── 📁 profile/                 # Profile pages
│   ├── 📁 collections/             # Collections management
│   └── 📁 api/                     # API routes (if using Next.js API)
│
├── 📁 components/                   # Reusable React components
│   ├── 📁 ui/                      # Base UI components (shadcn/ui)
│   │   ├── 📄 button.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 dialog.tsx
│   │   └── 📄 ...
│   ├── 📁 Layout/                  # Layout components
│   │   ├── 📄 Header.tsx
│   │   ├── 📄 Footer.tsx
│   │   ├── 📄 Sidebar.tsx
│   │   └── 📄 Navigation.tsx
│   ├── 📁 Common/                  # Common components
│   │   ├── 📄 PhotoGrid.tsx
│   │   ├── 📄 LoadingSpinner.tsx
│   │   ├── 📄 ErrorBoundary.tsx
│   │   └── 📄 SearchBar.tsx
│   ├── 📁 Forms/                   # Form components
│   │   ├── 📄 LoginForm.tsx
│   │   ├── 📄 UploadForm.tsx
│   │   ├── 📄 TestimonyForm.tsx
│   │   └── 📄 CollectionForm.tsx
│   └── 📁 Modals/                  # Modal components
│       ├── 📄 UploadModal.tsx
│       ├── 📄 ShareModal.tsx
│       └── 📄 ConfirmModal.tsx
│
├── 📁 hooks/                       # Custom React hooks
│   ├── 📄 useAuth.ts              # Authentication hook
│   ├── 📄 useUpload.ts            # File upload hook
│   ├── 📄 useInfiniteScroll.ts    # Infinite scrolling
│   ├── 📄 useLocalStorage.ts      # Local storage management
│   └── 📄 useDebounce.ts          # Debounced values
│
├── 📁 lib/                         # Utility libraries
│   ├── 📄 utils.ts                # General utilities
│   ├── 📄 auth.ts                 # Authentication utilities
│   ├── 📄 api.ts                  # API client configuration
│   ├── 📄 constants.ts            # Application constants
│   ├── 📄 validations.ts          # Form validation schemas
│   └── 📄 types.ts                # TypeScript type definitions
│
├── 📁 public/                      # Static assets
│   ├── 📁 images/                 # Static images
│   ├── 📁 icons/                  # Icon files
│   ├── 📄 favicon.ico             # Favicon
│   ├── 📄 manifest.json           # PWA manifest
│   └── 📄 robots.txt              # SEO robots file
│
├── 📁 server/                      # Backend server (if separate)
│   ├── 📁 routes/                 # API route handlers
│   │   ├── 📄 auth.ts
│   │   ├── 📄 photos.ts
│   │   ├── 📄 users.ts
│   │   ├── 📄 collections.ts
│   │   └── 📄 testimonies.ts
│   ├── 📁 middleware/             # Express middleware
│   │   ├── 📄 auth.ts
│   │   ├── 📄 upload.ts
│   │   ├── 📄 cors.ts
│   │   └── 📄 rateLimit.ts
│   ├── 📁 models/                 # Database models
│   │   ├── 📄 User.ts
│   │   ├── 📄 Photo.ts
│   │   ├── 📄 Collection.ts
│   │   └── 📄 Testimony.ts
│   ├── 📁 services/               # Business logic services
│   │   ├── 📄 emailService.ts
│   │   ├── 📄 uploadService.ts
│   │   ├── 📄 imageService.ts
│   │   └── 📄 analyticsService.ts
│   ├── 📁 utils/                  # Server utilities
│   │   ├── 📄 database.ts
│   │   ├── 📄 logger.ts
│   │   └── 📄 helpers.ts
│   ├── 📄 app.ts                  # Express app configuration
│   └── 📄 server.ts               # Server entry point
│
├── 📁 uploads/                     # User uploaded files
│   ├── 📁 photos/                 # Photo uploads
│   ├── 📁 avatars/                # User avatars
│   ├── 📁 blog/                   # Blog images
│   └── 📁 testimonies/            # Testimony media
│
├── 📁 database/                    # Database related files
│   ├── 📁 migrations/             # Database migrations
│   ├── 📁 seeds/                  # Database seed files
│   └── 📄 schema.sql              # Database schema
│
├── 📁 docs/                        # Documentation
│   ├── 📄 API.md                  # API documentation
│   ├── 📄 DEPLOYMENT.md           # Deployment guide
│   ├── 📄 CONTRIBUTING.md         # Contribution guidelines
│   └── 📄 SECURITY.md             # Security guidelines
│
├── 📁 tests/                       # Test files
│   ├── 📁 __mocks__/              # Mock files
│   ├── 📁 components/             # Component tests
│   ├── 📁 pages/                  # Page tests
│   ├── 📁 api/                    # API tests
│   └── 📄 setup.ts                # Test setup
│
├── 📄 package.json                # Dependencies and scripts
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 tailwind.config.ts          # Tailwind CSS configuration
├── 📄 next.config.mjs             # Next.js configuration
├── 📄 .env.example                # Environment variables example
├── 📄 .gitignore                  # Git ignore rules
├── 📄 docker-compose.yml          # Docker composition
├── 📄 Dockerfile                  # Docker configuration
└── 📄 README.md                   # This file
\`\`\`

---

## 🔧 Configuration Guide

### **Environment Variables**

Pixinity uses environment variables for configuration. Here's a comprehensive guide:

#### **Application Settings**
\`\`\`env
# Basic app configuration
NEXT_PUBLIC_APP_NAME=Pixinity
NEXT_PUBLIC_APP_URL=https://pixinity.org
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_DESCRIPTION="Humanitarian Photography Platform"

# API Configuration
NEXT_PUBLIC_API_URL=https://api.pixinity.org
API_VERSION=v1
API_TIMEOUT=30000
\`\`\`

#### **Database Configuration**
\`\`\`env
# Primary Database
DATABASE_URL=mysql://user:password@localhost:3306/pixinity
DB_HOST=localhost
DB_PORT=3306
DB_NAME=pixinity
DB_USER=pixinity_user
DB_PASSWORD=secure_password
DB_CONNECTION_LIMIT=20
DB_TIMEOUT=60000

# Read Replica (Optional)
READ_DATABASE_URL=mysql://user:password@read-replica:3306/pixinity
\`\`\`

#### **Authentication & Security**
\`\`\`env
# JWT Configuration
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Session Configuration
SESSION_SECRET=your-session-secret
SESSION_MAX_AGE=604800000
SESSION_SECURE=true
SESSION_HTTP_ONLY=true

# Password Security
BCRYPT_ROUNDS=12
PASSWORD_MIN_LENGTH=8
PASSWORD_REQUIRE_SPECIAL=true

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_SKIP_SUCCESSFUL=false
\`\`\`

#### **File Upload & Storage**
\`\`\`env
# Local Storage
UPLOAD_DIR=./uploads
TEMP_DIR=./temp
MAX_FILE_SIZE=10485760
MAX_FILES_PER_UPLOAD=10
ALLOWED_EXTENSIONS=jpg,jpeg,png,webp,gif,mp4,mov

# Cloud Storage (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=pixinity

# AWS S3 (Alternative)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=pixinity-uploads
\`\`\`

#### **Email Configuration**
\`\`\`env
# SMTP Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email Templates
FROM_EMAIL=noreply@pixinity.org
FROM_NAME=Pixinity Platform
SUPPORT_EMAIL=support@pixinity.org
ADMIN_EMAIL=admin@pixinity.org

# Email Features
ENABLE_EMAIL_VERIFICATION=true
ENABLE_PASSWORD_RESET=true
ENABLE_NOTIFICATIONS=true
\`\`\`

#### **External Services**
\`\`\`env
# Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
MIXPANEL_TOKEN=your-mixpanel-token
HOTJAR_ID=your-hotjar-id

# Social Media
TWITTER_API_KEY=your-twitter-api-key
FACEBOOK_APP_ID=your-facebook-app-id
INSTAGRAM_ACCESS_TOKEN=your-instagram-token

# Translation Services
GOOGLE_TRANSLATE_API_KEY=your-translate-api-key
DEEPL_API_KEY=your-deepl-api-key

# Content Moderation
PERSPECTIVE_API_KEY=your-perspective-api-key
CLARIFAI_API_KEY=your-clarifai-api-key
\`\`\`

#### **Feature Flags**
\`\`\`env
# Core Features
NEXT_PUBLIC_ENABLE_TESTIMONIES=true
NEXT_PUBLIC_ENABLE_COLLECTIONS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SOCIAL_SHARING=true

# Advanced Features
NEXT_PUBLIC_ENABLE_AI_MODERATION=false
NEXT_PUBLIC_ENABLE_BLOCKCHAIN_VERIFICATION=false
NEXT_PUBLIC_ENABLE_LIVE_STREAMING=false
NEXT_PUBLIC_ENABLE_COLLABORATIVE_EDITING=true

# Experimental Features
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false
NEXT_PUBLIC_ENABLE_DEBUG_MODE=false
\`\`\`

### **Database Schema**

#### **Core Tables**

**Users Table**
\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(500),
    role ENUM('user', 'moderator', 'admin') DEFAULT 'user',
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    language VARCHAR(10) DEFAULT 'en',
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_created_at (created_at)
);
\`\`\`

**Photos Table**
\`\`\`sql
CREATE TABLE photos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    file_path VARCHAR(500) NOT NULL,
    thumbnail_path VARCHAR(500),
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    width INT,
    height INT,
    exif_data JSON,
    location_data JSON,
    tags JSON,
    category VARCHAR(100),
    is_public BOOLEAN DEFAULT TRUE,
    is_evidence BOOLEAN DEFAULT FALSE,
    is_sensitive BOOLEAN DEFAULT FALSE,
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_category (category),
    INDEX idx_is_public (is_public),
    INDEX idx_is_evidence (is_evidence),
    INDEX idx_created_at (created_at),
    FULLTEXT idx_search (title, description, tags)
);
\`\`\`

**Collections Table**
\`\`\`sql
CREATE TABLE collections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    cover_photo_id INT,
    is_public BOOLEAN DEFAULT TRUE,
    is_collaborative BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    photo_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (cover_photo_id) REFERENCES photos(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_slug (slug),
    INDEX idx_is_public (is_public),
    INDEX idx_created_at (created_at)
);
\`\`\`

**Testimonies Table**
\`\`\`sql
CREATE TABLE testimonies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    name VARCHAR(255),
    email VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    location VARCHAR(255),
    date_of_incident DATE,
    media_files JSON,
    contact_permission BOOLEAN DEFAULT FALSE,
    is_anonymous BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_notes TEXT,
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_location (location),
    INDEX idx_date_of_incident (date_of_incident),
    INDEX idx_is_verified (is_verified),
    FULLTEXT idx_search (title, content)
);
\`\`\`

---

## 🎨 UI/UX Design System

### **Design Principles**

#### **1. Accessibility First**
- **WCAG 2.1 AA Compliance**: All components meet accessibility standards
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 contrast ratio for all text
- **Focus Management**: Clear focus indicators and logical tab order

#### **2. Responsive Design**
- **Mobile-First Approach**: Designed for mobile, enhanced for desktop
- **Breakpoint System**: Consistent breakpoints across all components
- **Flexible Layouts**: Fluid grids and flexible typography
- **Touch-Friendly**: Minimum 44px touch targets on mobile devices

#### **3. Performance Optimization**
- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: JavaScript bundles split by route and feature
- **Image Optimization**: Automatic WebP conversion and responsive images
- **Minimal Bundle Size**: Tree-shaking and dead code elimination

### **Color Palette**

#### **Primary Colors**
\`\`\`css
:root {
  /* Brand Colors */
  --primary-50: #f0f9ff;
  --primary-100: #e0f2fe;
  --primary-200: #bae6fd;
  --primary-300: #7dd3fc;
  --primary-400: #38bdf8;
  --primary-500: #0ea5e9;  /* Primary Brand */
  --primary-600: #0284c7;
  --primary-700: #0369a1;
  --primary-800: #075985;
  --primary-900: #0c4a6e;
  
  /* Neutral Colors */
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;
  
  /* Semantic Colors */
  --success-500: #10b981;
  --warning-500: #f59e0b;
  --error-500: #ef4444;
  --info-500: #3b82f6;
}
\`\`\`

#### **Dark Mode Support**
\`\`\`css
.dark {
  /* Dark mode overrides */
  --background: var(--neutral-900);
  --foreground: var(--neutral-50);
  --card: var(--neutral-800);
  --card-foreground: var(--neutral-100);
  --border: var(--neutral-700);
  --input: var(--neutral-700);
}
\`\`\`

### **Typography System**

#### **Font Stack**
\`\`\`css
:root {
  --font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Geist Mono', 'SF Mono', Monaco, 'Cascadia Code', monospace;
  --font-serif: 'Times New Roman', Times, serif;
}
\`\`\`

#### **Type Scale**
\`\`\`css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 3.75rem;    /* 60px */
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
\`\`\`

### **Component Library**

#### **Button Components**
\`\`\`tsx
// Primary Button
<Button variant="primary" size="md">
  Upload Evidence
</Button>

// Secondary Button
<Button variant="secondary" size="md">
  Cancel
</Button>

// Destructive Button
<Button variant="destructive" size="md">
  Delete Collection
</Button>

// Ghost Button
<Button variant="ghost" size="sm">
  Learn More
</Button>
\`\`\`

#### **Form Components**
\`\`\`tsx
// Input Field
<Input
  type="text"
  placeholder="Enter your testimony title"
  label="Title"
  required
  error="This field is required"
/>

// Textarea
<Textarea
  placeholder="Share your story..."
  label="Testimony"
  rows={6}
  maxLength={5000}
/>

// Select Dropdown
<Select
  label="Category"
  placeholder="Select a category"
  options={[
    { value: 'evidence', label: 'Evidence' },
    { value: 'testimony', label: 'Testimony' },
    { value: 'documentation', label: 'Documentation' }
  ]}
/>
\`\`\`

#### **Layout Components**
\`\`\`tsx
// Card Component
<Card className="p-6">
  <CardHeader>
    <CardTitle>Photo Details</CardTitle>
    <CardDescription>
      Manage your photo information and settings
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter>
    <Button>Save Changes</Button>
  </CardFooter>
</Card>

// Modal Dialog
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Are you sure?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
\`\`\`

### **Animation Guidelines**

#### **Motion Principles**
- **Purposeful**: Every animation serves a functional purpose
- **Responsive**: Animations adapt to user preferences and device capabilities
- **Accessible**: Respects `prefers-reduced-motion` settings
- **Performant**: Uses CSS transforms and opacity for smooth 60fps animations

#### **Common Animations**
\`\`\`tsx
// Fade In Animation
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

// Slide Up Animation
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
};

// Stagger Animation for Lists
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
\`\`\`

---

## 🔌 API Documentation

### **Authentication Endpoints**

#### **POST /api/auth/register**
Register a new user account.

**Request Body:**
\`\`\`json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "language": "en"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Registration successful. Please check your email for verification.",
  "data": {
    "user": {
      "id": 123,
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": false,
      "role": "user",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
\`\`\`

#### **POST /api/auth/login**
Authenticate user and create session.

**Request Body:**
\`\`\`json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 123,
      "username": "johndoe",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "avatar": "/uploads/avatars/123.jpg",
      "role": "user",
      "lastLogin": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
\`\`\`

### **Photo Management Endpoints**

#### **POST /api/photos/upload**
Upload one or more photos with metadata.

**Request (Multipart Form Data):**
\`\`\`
files: [File, File, ...] (max 10 files)
title: "Evidence from Gaza"
description: "Documentation of civilian impact"
category: "evidence"
tags: ["gaza", "civilian", "documentation"]
location: {"lat": 31.5017, "lng": 34.4668, "name": "Gaza"}
isEvidence: true
isSensitive: true
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Photos uploaded successfully",
  "data": {
    "photos": [
      {
        "id": 456,
        "title": "Evidence from Gaza",
        "description": "Documentation of civilian impact",
        "filename": "evidence_20240115_103000.jpg",
        "filePath": "/uploads/photos/456_evidence_20240115_103000.jpg",
        "thumbnailPath": "/uploads/photos/thumbs/456_thumb.jpg",
        "fileSize": 2048576,
        "mimeType": "image/jpeg",
        "width": 1920,
        "height": 1080,
        "category": "evidence",
        "tags": ["gaza", "civilian", "documentation"],
        "isEvidence": true,
        "isSensitive": true,
        "verificationStatus": "pending",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "uploadStats": {
      "totalFiles": 1,
      "successfulUploads": 1,
      "failedUploads": 0,
      "totalSize": 2048576
    }
  }
}
\`\`\`

#### **GET /api/photos**
Retrieve photos with filtering and pagination.

**Query Parameters:**
\`\`\`
page: 1
limit: 20
category: "evidence"
tags: "gaza,civilian"
userId: 123
isEvidence: true
sortBy: "createdAt"
sortOrder: "desc"
search: "gaza documentation"
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "photos": [
      {
        "id": 456,
        "title": "Evidence from Gaza",
        "description": "Documentation of civilian impact",
        "filePath": "/uploads/photos/456_evidence_20240115_103000.jpg",
        "thumbnailPath": "/uploads/photos/thumbs/456_thumb.jpg",
        "category": "evidence",
        "tags": ["gaza", "civilian", "documentation"],
        "user": {
          "id": 123,
          "username": "johndoe",
          "avatar": "/uploads/avatars/123.jpg"
        },
        "stats": {
          "viewCount": 150,
          "likeCount": 23,
          "downloadCount": 5
        },
        "isLiked": false,
        "isSaved": false,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100,
      "itemsPerPage": 20,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
\`\`\`

### **Collection Management Endpoints**

#### **POST /api/collections**
Create a new photo collection.

**Request Body:**
\`\`\`json
{
  "title": "Gaza Documentation 2024",
  "description": "Comprehensive documentation of civilian impact in Gaza",
  "isPublic": true,
  "isCollaborative": false,
  "coverPhotoId": 456,
  "tags": ["gaza", "documentation", "evidence"]
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Collection created successfully",
  "data": {
    "collection": {
      "id": 789,
      "title": "Gaza Documentation 2024",
      "description": "Comprehensive documentation of civilian impact in Gaza",
      "slug": "gaza-documentation-2024",
      "isPublic": true,
      "isCollaborative": false,
      "coverPhoto": {
        "id": 456,
        "thumbnailPath": "/uploads/photos/thumbs/456_thumb.jpg"
      },
      "user": {
        "id": 123,
        "username": "johndoe"
      },
      "stats": {
        "photoCount": 0,
        "viewCount": 0
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  }
}
\`\`\`

### **Testimony Endpoints**

#### **POST /api/testimonies**
Submit a new testimony.

**Request Body:**
\`\`\`json
{
  "title": "Survivor Account from Gaza",
  "content": "My family and I experienced...",
  "name": "Anonymous Survivor",
  "location": "Gaza Strip",
  "dateOfIncident": "2024-01-10",
  "isAnonymous": true,
  "contactPermission": false,
  "language": "en",
  "mediaFiles": [
    {
      "type": "image",
      "filename": "testimony_evidence.jpg",
      "description": "Supporting evidence"
    }
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": "Testimony submitted successfully",
  "data": {
    "testimony": {
      "id": 321,
      "title": "Survivor Account from Gaza",
      "content": "My family and I experienced...",
      "location": "Gaza Strip",
      "dateOfIncident": "2024-01-10",
      "isAnonymous": true,
      "isVerified": false,
      "language": "en",
      "submittedAt": "2024-01-15T10:30:00Z"
    }
  }
}
\`\`\`

### **Analytics Endpoints**

#### **GET /api/analytics/platform**
Get platform-wide statistics.

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "stats": {
      "totalPhotos": 15420,
      "totalUsers": 3250,
      "totalCollections": 890,
      "totalTestimonies": 156,
      "totalViews": 2450000,
      "totalDownloads": 45600,
      "evidencePhotos": 8900,
      "verifiedTestimonies": 89
    },
    "trends": {
      "dailyUploads": [
        { "date": "2024-01-15", "count": 45 },
        { "date": "2024-01-14", "count": 38 }
      ],
      "topCategories": [
        { "category": "evidence", "count": 8900 },
        { "category": "documentation", "count": 3200 }
      ]
    }
  }
}
\`\`\`

### **Error Handling**

All API endpoints follow a consistent error response format:

\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_123456789"
}
\`\`\`

**Common Error Codes:**
- `VALIDATION_ERROR`: Invalid input data
- `AUTHENTICATION_ERROR`: Invalid credentials or expired token
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `NOT_FOUND`: Requested resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `FILE_TOO_LARGE`: Uploaded file exceeds size limit
- `UNSUPPORTED_FILE_TYPE`: File type not allowed
- `SERVER_ERROR`: Internal server error

---

## 🚀 Deployment Guide

### **Production Deployment**

#### **Vercel Deployment (Recommended)**

1. **Prepare for Deployment**
\`\`\`bash
# Ensure all dependencies are installed
npm install

# Run build to check for errors
npm run build

# Run tests
npm test
\`\`\`

2. **Deploy to Vercel**
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
\`\`\`

3. **Environment Variables Setup**
In your Vercel dashboard, add all production environment variables:
\`\`\`env
DATABASE_URL=mysql://user:pass@prod-db:3306/pixinity
JWT_SECRET=your-production-jwt-secret
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
CLOUDINARY_CLOUD_NAME=your-prod-cloud
CLOUDINARY_API_KEY=your-prod-api-key
CLOUDINARY_API_SECRET=your-prod-api-secret
\`\`\`

#### **Docker Deployment**

1. **Build Docker Images**
\`\`\`bash
# Build the application
docker build -t pixinity:latest .

# Or use docker-compose
docker-compose build
\`\`\`

2. **Production Docker Compose**
\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mysql://user:pass@db:3306/pixinity
    depends_on:
      - db
      - redis
    
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: pixinity
      MYSQL_USER: pixinity_user
      MYSQL_PASSWORD: secure_password
    volumes:
      - mysql_data:/var/lib/mysql
    
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app

volumes:
  mysql_data:
  redis_data:
\`\`\`

3. **Deploy with Docker Compose**
\`\`\`bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Scale the application
docker-compose up -d --scale app=3
\`\`\`

#### **AWS Deployment**

1. **EC2 Setup**
\`\`\`bash
# Launch EC2 instance (Ubuntu 22.04 LTS)
# Install Docker and Docker Compose
sudo apt update
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker $USER

# Clone repository
git clone https://github.com/yourusername/pixinity.git
cd pixinity

# Set up environment variables
cp .env.example .env.production
nano .env.production

# Deploy
docker-compose -f docker-compose.prod.yml up -d
\`\`\`

2. **RDS Database Setup**
\`\`\`bash
# Create RDS MySQL instance
aws rds create-db-instance \
  --db-instance-identifier pixinity-prod \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password SecurePassword123 \
  --allocated-storage 20 \
  --db-name pixinity
\`\`\`

3. **S3 Storage Setup**
\`\`\`bash
# Create S3 bucket for file uploads
aws s3 mb s3://pixinity-uploads-prod

# Set bucket policy for public read access to thumbnails
aws s3api put-bucket-policy \
  --bucket pixinity-uploads-prod \
  --policy file://s3-bucket-policy.json
\`\`\`

### **CI/CD Pipeline**

#### **GitHub Actions Workflow**
\`\`\`yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      
      # Deploy to Vercel
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
\`\`\`

### **Performance Optimization**

#### **Frontend Optimizations**
\`\`\`javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  },
  
  // Image optimization
  images: {
    domains: ['res.cloudinary.com', 'pixinity.org'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30 // 30 days
  },
  
  // Compression
  compress: true,
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

export default nextConfig
\`\`\`

#### **Database Optimizations**
\`\`\`sql
-- Add indexes for better query performance
CREATE INDEX idx_photos_user_created ON photos(user_id, created_at DESC);
CREATE INDEX idx_photos_category_public ON photos(category, is_public);
CREATE INDEX idx_collections_user_public ON collections(user_id, is_public);

-- Optimize full-text search
ALTER TABLE photos ADD FULLTEXT(title, description);
ALTER TABLE testimonies ADD FULLTEXT(title, content);

-- Partitioning for large tables
ALTER TABLE photos PARTITION BY RANGE (YEAR(created_at)) (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);
\`\`\`

### **Monitoring & Logging**

#### **Application Monitoring**
\`\`\`javascript
// lib/monitoring.ts
import { Analytics } from '@vercel/analytics'
import { SpeedInsights } from '@vercel/speed-insights/next'

// Error tracking
export const trackError = (error: Error, context?: any) => {
  console.error('Application Error:', error, context)
  
  // Send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Sentry, LogRocket, or similar
    captureException(error, { extra: context })
  }
}

// Performance monitoring
export const trackPerformance = (metric: string, value: number) => {
  if (process.env.NODE_ENV === 'production') {
    Analytics.track(metric, { value })
  }
}
\`\`\`

#### **Health Check Endpoints**
\`\`\`javascript
// app/api/health/route.ts
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV,
    database: 'connected',
    redis: 'connected',
    storage: 'available'
  }
  
  try {
    // Check database connection
    await db.raw('SELECT 1')
    
    // Check Redis connection
    await redis.ping()
    
    return Response.json(health)
  } catch (error) {
    return Response.json(
      { ...health, status: 'unhealthy', error: error.message },
      { status: 503 }
    )
  }
}
\`\`\`

---

## 🧪 Testing Strategy

### **Testing Philosophy**

Pixinity follows a comprehensive testing strategy that ensures reliability, security, and user experience quality across all features. Our testing pyramid includes unit tests, integration tests, end-to-end tests, and specialized security testing.

### **Testing Stack**

- **Unit Testing**: Jest + React Testing Library
- **Integration Testing**: Jest + Supertest
- **E2E Testing**: Playwright
- **Visual Testing**: Chromatic + Storybook
- **Performance Testing**: Lighthouse CI
- **Security Testing**: OWASP ZAP + Snyk

### **Unit Testing**

#### **Component Testing**
\`\`\`typescript
// tests/components/PhotoGrid.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { PhotoGrid } from '@/components/Common/PhotoGrid'
import { mockPhotos } from '../__mocks__/photos'

describe('PhotoGrid', () => {
  it('renders photos in masonry layout', async () => {
    render(<PhotoGrid photos={mockPhotos} />)
    
    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(mockPhotos.length)
    })
    
    // Check for proper alt text
    mockPhotos.forEach(photo => {
      expect(screen.getByAltText(photo.title)).toBeInTheDocument()
    })
  })
  
  it('handles empty state gracefully', () => {
    render(<PhotoGrid photos={[]} />)
    
    expect(screen.getByText('No photos found')).toBeInTheDocument()
    expect(screen.getByText('Upload your first photo to get started')).toBeInTheDocument()
  })
  
  it('shows loading state during fetch', () => {
    render(<PhotoGrid photos={[]} loading={true} />)
    
    expect(screen.getByTestId('photo-grid-skeleton')).toBeInTheDocument()
  })
})
\`\`\`

#### **Hook Testing**
\`\`\`typescript
// tests/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import { AuthProvider } from '@/contexts/AuthContext'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('useAuth', () => {
  it('handles login flow correctly', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isLoading).toBe(false)
    
    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })
    
    expect(result.current.user).toBeDefined()
    expect(result.current.isAuthenticated).toBe(true)
  })
  
  it('handles logout correctly', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    // First login
    await act(async () => {
      await result.current.login('test@example.com', 'password')
    })
    
    // Then logout
    await act(async () => {
      await result.current.logout()
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})
\`\`\`

### **Integration Testing**

#### **API Route Testing**
\`\`\`typescript
// tests/api/photos.test.ts
import request from 'supertest'
import { app } from '@/server/app'
import { createTestUser, createTestPhoto } from '../helpers/testData'

describe('/api/photos', () => {
  let testUser: any
  let authToken: string
  
  beforeEach(async () => {
    testUser = await createTestUser()
    authToken = generateTestToken(testUser.id)
  })
  
  describe('POST /api/photos/upload', () => {
    it('uploads photo successfully with valid data', async () => {
      const response = await request(app)
        .post('/api/photos/upload')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('files', 'tests/fixtures/test-image.jpg')
        .field('title', 'Test Photo')
        .field('description', 'Test Description')
        .field('category', 'evidence')
        .expect(201)
      
      expect(response.body.success).toBe(true)
      expect(response.body.data.photos).toHaveLength(1)
      expect(response.body.data.photos[0].title).toBe('Test Photo')
    })
    
    it('rejects upload without authentication', async () => {
      await request(app)
        .post('/api/photos/upload')
        .attach('files', 'tests/fixtures/test-image.jpg')
        .expect(401)
    })
    
    it('validates file size limits', async () => {
      const response = await request(app)
        .post('/api/photos/upload')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('files', 'tests/fixtures/large-image.jpg') // > 10MB
        .expect(400)
      
      expect(response.body.error.code).toBe('FILE_TOO_LARGE')
    })
  })
  
  describe('GET /api/photos', () => {
    beforeEach(async () => {
      // Create test photos
      await createTestPhoto({ userId: testUser.id, isPublic: true })
      await createTestPhoto({ userId: testUser.id, isPublic: false })
    })
    
    it('returns public photos for unauthenticated users', async () => {
      const response = await request(app)
        .get('/api/photos')
        .expect(200)
      
      expect(response.body.data.photos).toHaveLength(1)
      expect(response.body.data.photos[0].isPublic).toBe(true)
    })
    
    it('includes private photos for authenticated owner', async () => {
      const response = await request(app)
        .get('/api/photos')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ userId: testUser.id })
        .expect(200)
      
      expect(response.body.data.photos).toHaveLength(2)
    })
  })
})
\`\`\`

### **End-to-End Testing**

#### **User Journey Tests**
\`\`\`typescript
// tests/e2e/upload-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Photo Upload Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as test user
    await page.goto('/login')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password')
    await page.click('[data-testid="login-button"]')
    await expect(page).toHaveURL('/dashboard')
  })
  
  test('uploads evidence photo successfully', async ({ page }) => {
    // Navigate to upload
    await page.click('[data-testid="upload-button"]')
    await expect(page.locator('[data-testid="upload-modal"]')).toBeVisible()
    
    // Fill upload form
    await page.setInputFiles('[data-testid="file-input"]', 'tests/fixtures/evidence.jpg')
    await page.fill('[data-testid="title-input"]', 'Evidence from Gaza')
    await page.fill('[data-testid="description-input"]', 'Documentation of civilian impact')
    await page.selectOption('[data-testid="category-select"]', 'evidence')
    await page.check('[data-testid="is-evidence-checkbox"]')
    await page.check('[data-testid="is-sensitive-checkbox"]')
    
    // Submit upload
    await page.click('[data-testid="upload-submit-button"]')
    
    // Verify success
    await expect(page.locator('[data-testid="success-toast"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-toast"]')).toContainText('Photo uploaded successfully')
    
    // Verify photo appears in grid
    await page.goto('/explore')
    await expect(page.locator('[data-testid="photo-card"]').first()).toContainText('Evidence from Gaza')
  })
  
  test('handles upload errors gracefully', async ({ page }) => {
    await page.click('[data-testid="upload-button"]')
    
    // Try to upload without file
    await page.fill('[data-testid="title-input"]', 'Test Photo')
    await page.click('[data-testid="upload-submit-button"]')
    
    // Verify error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Please select at least one file')
  })
})

test.describe('Testimony Submission', () => {
  test('submits anonymous testimony', async ({ page }) => {
    await page.goto('/testimonies/submit')
    
    // Fill testimony form
    await page.fill('[data-testid="title-input"]', 'My Experience in Gaza')
    await page.fill('[data-testid="content-textarea"]', 'I witnessed the destruction of civilian infrastructure...')
    await page.fill('[data-testid="location-input"]', 'Gaza Strip')
    await page.fill('[data-testid="date-input"]', '2024-01-10')
    await page.check('[data-testid="anonymous-checkbox"]')
    
    // Submit testimony
    await page.click('[data-testid="submit-testimony-button"]')
    
    // Verify success
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Testimony submitted successfully')
  })
})
\`\`\`

### **Performance Testing**

#### **Lighthouse CI Configuration**
\`\`\`javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/explore',
        'http://localhost:3000/collections',
        'http://localhost:3000/testimonies'
      ],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
\`\`\`

#### **Load Testing**
\`\`\`javascript
// tests/performance/load-test.js
import http from 'k6/http'
import { check, sleep } from 'k6'

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    http_req_failed: ['rate<0.1'],    // Error rate must be below 10%
  }
}

export default function () {
  // Test homepage
  let response = http.get('https://pixinity.org/')
  check(response, {
    'homepage loads successfully': (r) => r.status === 200,
    'homepage loads in reasonable time': (r) => r.timings.duration < 1000,
  })
  
  // Test API endpoints
  response = http.get('https://pixinity.org/api/photos?limit=20')
  check(response, {
    'photos API responds': (r) => r.status === 200,
    'photos API returns data': (r) => JSON.parse(r.body).data.photos.length > 0,
  })
  
  sleep(1)
}
\`\`\`

### **Security Testing**

#### **Authentication Security Tests**
\`\`\`typescript
// tests/security/auth.test.ts
import request from 'supertest'
import { app } from '@/server/app'

describe('Authentication Security', () => {
  test('prevents SQL injection in login', async () => {
    const maliciousPayload = {
      email: "admin@example.com' OR '1'='1",
      password: "password"
    }
    
    const response = await request(app)
      .post('/api/auth/login')
      .send(maliciousPayload)
      .expect(401)
    
    expect(response.body.error.code).toBe('AUTHENTICATION_ERROR')
  })
  
  test('enforces rate limiting on login attempts', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'wrongpassword'
    }
    
    // Make multiple failed login attempts
    for (let i = 0; i < 6; i++) {
      await request(app)
        .post('/api/auth/login')
        .send(loginData)
    }
    
    // Next attempt should be rate limited
    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(429)
    
    expect(response.body.error.code).toBe('RATE_LIMIT_EXCEEDED')
  })
  
  test('validates JWT token properly', async () => {
    const invalidToken = 'invalid.jwt.token'
    
    const response = await request(app)
      .get('/api/photos')
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401)
    
    expect(response.body.error.code).toBe('AUTHENTICATION_ERROR')
  })
})
\`\`\`

### **Test Data Management**

#### **Test Fixtures**
\`\`\`typescript
// tests/helpers/testData.ts
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

export const createTestUser = async (overrides = {}) => {
  const userData = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: await bcrypt.hash('password123', 10),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    isVerified: true,
    role: 'user',
    ...overrides
  }
  
  return await db.table('users').insert(userData).returning('*')
}

export const createTestPhoto = async (overrides = {}) => {
  const photoData = {
    userId: 1,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    filename: `${faker.string.uuid()}.jpg`,
    filePath: `/uploads/photos/${faker.string.uuid()}.jpg`,
    thumbnailPath: `/uploads/photos/thumbs/${faker.string.uuid()}.jpg`,
    fileSize: faker.number.int({ min: 100000, max: 5000000 }),
    mimeType: 'image/jpeg',
    width: 1920,
    height: 1080,
    category: 'evidence',
    isPublic: true,
    isEvidence: false,
    ...overrides
  }
  
  return await db.table('photos').insert(photoData).returning('*')
}

export const createTestCollection = async (overrides = {}) => {
  const collectionData = {
    userId: 1,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    slug: faker.helpers.slugify(faker.lorem.sentence()),
    isPublic: true,
    isCollaborative: false,
    ...overrides
  }
  
  return await db.table('collections').insert(collectionData).returning('*')
}
\`\`\`

### **Continuous Integration**

#### **GitHub Actions Test Workflow**
\`\`\`yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit -- --coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  integration-tests:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: pixinity_test
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run database migrations
        run: npm run db:migrate:test
        env:
          DATABASE_URL: mysql://root:root@localhost:3306/pixinity_test
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: mysql://root:root@localhost:3306/pixinity_test

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Build application
        run: npm run build
      
      - name: Start application
        run: npm start &
        
      - name: Wait for application
        run: npx wait-on http://localhost:3000
      
      - name: Run E2E tests
        run: npx playwright test
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  security-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
      
      - name: Run OWASP ZAP scan
        uses: zaproxy/action-baseline@v0.7.0
        with:
          target: 'http://localhost:3000'
\`\`\`

---

## 🔒 Security Guidelines

### **Security Architecture**

Pixinity implements a multi-layered security approach to protect sensitive humanitarian data and user privacy. Our security model addresses authentication, authorization, data protection, and compliance with international privacy standards.

### **Authentication & Authorization**

#### **Multi-Factor Authentication (MFA)**
\`\`\`typescript
// lib/auth/mfa.ts
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'

export class MFAService {
  static generateSecret(userEmail: string) {
    return speakeasy.generateSecret({
      name: `Pixinity (${userEmail})`,
      issuer: 'Pixinity',
      length: 32
    })
  }
  
  static async generateQRCode(secret: string): Promise<string> {
    return await QRCode.toDataURL(secret)
  }
  
  static verifyToken(token: string, secret: string): boolean {
    return speakeasy.totp.verify({
      secret,
      token,
      window: 2, // Allow 2 time steps of variance
      time: Math.floor(Date.now() / 1000)
    })
  }
}

// Usage in API route
export async function POST(request: Request) {
  const { token, userId } = await request.json()
  
  const user = await getUserById(userId)
  if (!user.mfaSecret) {
    return Response.json({ error: 'MFA not enabled' }, { status: 400 })
  }
  
  const isValid = MFAService.verifyToken(token, user.mfaSecret)
  if (!isValid) {
    return Response.json({ error: 'Invalid MFA token' }, { status: 401 })
  }
  
  // Generate session token
  const sessionToken = jwt.sign(
    { userId, mfaVerified: true },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
  
  return Response.json({ token: sessionToken })
}
\`\`\`

#### **Role-Based Access Control (RBAC)**
\`\`\`typescript
// lib/auth/rbac.ts
export enum Role {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  LEGAL_EXPERT = 'legal_expert'
}

export enum Permission {
  READ_PUBLIC_CONTENT = 'read:public_content',
  READ_PRIVATE_CONTENT = 'read:private_content',
  CREATE_CONTENT = 'create:content',
  EDIT_OWN_CONTENT = 'edit:own_content',
  DELETE_OWN_CONTENT = 'delete:own_content',
  MODERATE_CONTENT = 'moderate:content',
  VERIFY_EVIDENCE = 'verify:evidence',
  ACCESS_ANALYTICS = 'access:analytics',
  MANAGE_USERS = 'manage:users'
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.USER]: [
    Permission.READ_PUBLIC_CONTENT,
    Permission.CREATE_CONTENT,
    Permission.EDIT_OWN_CONTENT,
    Permission.DELETE_OWN_CONTENT
  ],
  [Role.MODERATOR]: [
    ...rolePermissions[Role.USER],
    Permission.MODERATE_CONTENT,
    Permission.READ_PRIVATE_CONTENT
  ],
  [Role.LEGAL_EXPERT]: [
    ...rolePermissions[Role.USER],
    Permission.VERIFY_EVIDENCE,
    Permission.READ_PRIVATE_CONTENT,
    Permission.ACCESS_ANALYTICS
  ],
  [Role.ADMIN]: Object.values(Permission)
}

export function hasPermission(userRole: Role, permission: Permission): boolean {
  return rolePermissions[userRole]?.includes(permission) ?? false
}

// Middleware for permission checking
export function requirePermission(permission: Permission) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user // Set by authentication middleware
    
    if (!user || !hasPermission(user.role, permission)) {
      return res.status(403).json({
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'You do not have permission to perform this action'
        }
      })
    }
    
    next()
  }
}
\`\`\`

### **Data Protection & Privacy**

#### **Data Encryption**
\`\`\`typescript
// lib/security/encryption.ts
import crypto from 'crypto'

export class EncryptionService {
  private static readonly algorithm = 'aes-256-gcm'
  private static readonly keyLength = 32
  private static readonly ivLength = 16
  private static readonly tagLength = 16
  
  static encrypt(text: string, key?: string): string {
    const encryptionKey = key ? Buffer.from(key, 'hex') : this.generateKey()
    const iv = crypto.randomBytes(this.ivLength)
    
    const cipher = crypto.createCipher(this.algorithm, encryptionKey, iv)
    
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const tag = cipher.getAuthTag()
    
    // Combine iv, tag, and encrypted data
    return iv.toString('hex') + tag.toString('hex') + encrypted
  }
  
  static decrypt(encryptedData: string, key: string): string {
    const keyBuffer = Buffer.from(key, 'hex')
    
    // Extract iv, tag, and encrypted data
    const iv = Buffer.from(encryptedData.slice(0, this.ivLength * 2), 'hex')
    const tag = Buffer.from(encryptedData.slice(this.ivLength * 2, (this.ivLength + this.tagLength) * 2), 'hex')
    const encrypted = encryptedData.slice((this.ivLength + this.tagLength) * 2)
    
    const decipher = crypto.createDecipher(this.algorithm, keyBuffer, iv)
    decipher.setAuthTag(tag)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }
  
  private static generateKey(): Buffer {
    return crypto.randomBytes(this.keyLength)
  }
}

// Usage for sensitive data
export async function storeTestimony(testimonyData: any) {
  const encryptionKey = process.env.TESTIMONY_ENCRYPTION_KEY
  
  const encryptedContent = EncryptionService.encrypt(
    testimonyData.content,
    encryptionKey
  )
  
  return await db.table('testimonies').insert({
    ...testimonyData,
    content: encryptedContent,
    isEncrypted: true
  })
}
\`\`\`

#### **Personal Data Anonymization**
\`\`\`typescript
// lib/security/anonymization.ts
import crypto from 'crypto'

export class AnonymizationService {
  static hashPII(data: string): string {
    return crypto
      .createHash('sha256')
      .update(data + process.env.PII_SALT)
      .digest('hex')
  }
  
  static anonymizeTestimony(testimony: any) {
    return {
      ...testimony,
      // Replace personal identifiers with hashed versions
      submitterEmail: testimony.email ? this.hashPII(testimony.email) : null,
      submitterName: testimony.isAnonymous ? null : this.hashPII(testimony.name),
      // Keep location general (city/region level only)
      location: this.generalizeLocation(testimony.location),
      // Remove or hash any other PII
      contactInfo: null,
      ipAddress: this.hashPII(testimony.ipAddress)
    }
  }
  
  private static generalizeLocation(location: string): string {
    // Remove specific addresses, keep only city/region
    const parts = location.split(',')
    return parts.slice(-2).join(',').trim() // Keep last 2 parts (city, country)
  }
}
\`\`\`

### **Content Security & Moderation**

#### **Automated Content Moderation**
\`\`\`typescript
// lib/security/moderation.ts
import { PerspectiveApi } from '@google-cloud/perspective'

export class ModerationService {
  private static perspective = new PerspectiveApi({
    apiKey: process.env.PERSPECTIVE_API_KEY
  })
  
  static async moderateContent(content: string) {
    try {
      const result = await this.perspective.comments.analyze({
        requestBody: {
          comment: { text: content },
          requestedAttributes: {
            TOXICITY: {},
            SEVERE_TOXICITY: {},
            IDENTITY_ATTACK: {},
            INSULT: {},
            PROFANITY: {},
            THREAT: {}
          }
        }
      })
      
      const scores = result.data.attributeScores
      const flags = []
      
      // Check toxicity thresholds
      if (scores.TOXICITY.summaryScore.value > 0.7) {
        flags.push('high_toxicity')
      }
      
      if (scores.SEVERE_TOXICITY.summaryScore.value > 0.5) {
        flags.push('severe_toxicity')
      }
      
      if (scores.THREAT.summaryScore.value > 0.5) {
        flags.push('threat')
      }
      
      return {
        approved: flags.length === 0,
        flags,
        scores: Object.keys(scores).reduce((acc, key) => {
          acc[key] = scores[key].summaryScore.value
          return acc
        }, {})
      }
    } catch (error) {
      console.error('Content moderation failed:', error)
      // Fail safe - require manual review
      return {
        approved: false,
        flags: ['moderation_error'],
        requiresManualReview: true
      }
    }
  }
  
  static async moderateImage(imageBuffer: Buffer) {
    // Use Google Cloud Vision API or similar for image moderation
    // Check for inappropriate content, violence, etc.
    // Return moderation results
  }
}
\`\`\`

#### **Evidence Verification System**
\`\`\`typescript
// lib/security/verification.ts
import { createHash } from 'crypto'
import exifParser from 'exif-parser'

export class VerificationService {
  static generateContentHash(buffer: Buffer): string {
    return createHash('sha256').update(buffer).digest('hex')
  }
  
  static extractMetadata(imageBuffer: Buffer) {
    try {
      const parser = exifParser.create(imageBuffer)
      const result = parser.parse()
      
      return {
        timestamp: result.tags?.DateTime || result.tags?.DateTimeOriginal,
        gps: result.tags?.GPSLatitude && result.tags?.GPSLongitude ? {
          latitude: result.tags.GPSLatitude,
          longitude: result.tags.GPSLongitude
        } : null,
        camera: {
          make: result.tags?.Make,
          model: result.tags?.Model,
          software: result.tags?.Software
        },
        technical: {
          width: result.imageSize?.width,
          height: result.imageSize?.height,
          orientation: result.tags?.Orientation
        }
      }
    } catch (error) {
      console.error('Metadata extraction failed:', error)
      return null
    }
  }
  
  static async verifyEvidence(file: File, metadata: any) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const contentHash = this.generateContentHash(buffer)
    const extractedMetadata = this.extractMetadata(buffer)
    
    const verification = {
      contentHash,
      originalFilename: file.name,
      fileSize: file.size,
      mimeType: file.type,
      uploadTimestamp: new Date().toISOString(),
      metadata: extractedMetadata,
      verificationFlags: []
    }
    
    // Check for potential manipulation
    if (!extractedMetadata) {
      verification.verificationFlags.push('no_metadata')
    }
    
    if (extractedMetadata?.technical && 
        (extractedMetadata.technical.width % 8 !== 0 || 
         extractedMetadata.technical.height % 8 !== 0)) {
      verification.verificationFlags.push('unusual_dimensions')
    }
    
    // Store verification record
    await db.table('evidence_verification').insert({
      contentHash,
      verificationData: JSON.stringify(verification),
      status: verification.verificationFlags.length > 0 ? 'flagged' : 'verified'
    })
    
    return verification
  }
}
\`\`\`

### **API Security**

#### **Rate Limiting & DDoS Protection**
\`\`\`typescript
// middleware/rateLimiting.ts
import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)

// Different rate limits for different endpoints
export const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts. Please try again later.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
})

export const uploadLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 uploads per hour
  message: {
    error: {
      code: 'UPLOAD_RATE_LIMIT_EXCEEDED',
      message: 'Upload limit exceeded. Please try again later.'
    }
  }
})

export const apiLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args),
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests per window
  message: {
    error: {
      code: 'API_RATE_LIMIT_EXCEEDED',
      message: 'API rate limit exceeded. Please slow down your requests.'
    }
  }
})
\`\`\`

#### **Input Validation & Sanitization**
\`\`\`typescript
// lib/validation/schemas.ts
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'

// Custom sanitization transform
const sanitizeHtml = z.string().transform((val) => DOMPurify.sanitize(val))

export const testimonySchema = z.object({
  title: z.string()
    .min(10, 'Title must be at least 10 characters')
    .max(200, 'Title must be less than 200 characters')
    .transform((val) => DOMPurify.sanitize(val)),
  
  content: z.string()
    .min(50, 'Content must be at least 50 characters')
    .max(10000, 'Content must be less than 10,000 characters')
    .transform((val) => DOMPurify.sanitize(val)),
  
  location: z.string()
    .max(100, 'Location must be less than 100 characters')
    .optional()
    .transform((val) => val ? DOMPurify.sanitize(val) : undefined),
  
  dateOfIncident: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .optional(),
  
  isAnonymous: z.boolean().default(false),
  contactPermission: z.boolean().default(false),
  
  // Email validation with additional security
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email must be less than 255 characters')
    .optional()
    .transform((val) => val?.toLowerCase()),
  
  // Name validation
  name: z.string()
    .max(100, 'Name must be less than 100 characters')
    .optional()
    .transform((val) => val ? DOMPurify.sanitize(val) : undefined)
})

export const photoUploadSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title must be less than 255 characters')
    .transform((val) => DOMPurify.sanitize(val)),
  
  description: z.string()
    .max(2000, 'Description must be less than 2000 characters')
    .optional()
    .transform((val) => val ? DOMPurify.sanitize(val) : undefined),
  
  category: z.enum(['evidence', 'documentation', 'testimony', 'general']),
  
  tags: z.array(z.string().max(50))
    .max(10, 'Maximum 10 tags allowed')
    .optional(),
  
  isEvidence: z.boolean().default(false),
  isSensitive: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  
  location: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    name: z.string().max(100).optional()
  }).optional()
})

// Validation middleware
export function validateRequest(schema: z.ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req.body)
      req.body = validatedData
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          }
        })
      }
      next(error)
    }
  }
}
\`\`\`

### **Infrastructure Security**

#### **Security Headers**
\`\`\`typescript
// middleware/security.ts
import helmet from 'helmet'

export const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://pixinity.org"],
      scriptSrc: ["'self'", "'unsafe-eval'"], // Note: Remove unsafe-eval in production
      connectSrc: ["'self'", "https://api.pixinity.org"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
})

// Additional security middleware
export const additionalSecurity = (req: Request, res: Response, next: NextFunction) => {
  // Remove server information
  res.removeHeader('X-Powered-By')
  
  // Add custom security headers
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  next()
}
\`\`\`

### **Compliance & Privacy**

#### **GDPR Compliance**
\`\`\`typescript
// lib/privacy/gdpr.ts
export class GDPRService {
  static async exportUserData(userId: number) {
    const userData = await db.table('users')
      .where('id', userId)
      .first()
    
    const photos = await db.table('photos')
      .where('user_id', userId)
      .select('*')
    
    const collections = await db.table('collections')
      .where('user_id', userId)
      .select('*')
    
    const testimonies = await db.table('testimonies')
      .where('user_id', userId)
      .select('*')
    
    return {
      personal_information: {
        username: userData.username,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        created_at: userData.createdAt,
        last_login: userData.lastLogin
      },
      content: {
        photos: photos.map(photo => ({
          id: photo.id,
          title: photo.title,
          description: photo.description,
          created_at: photo.createdAt,
          category: photo.category
        })),
        collections: collections.map(collection => ({
          id: collection.id,
          title: collection.title,
          description: collection.description,
          created_at: collection.createdAt
        })),
        testimonies: testimonies.map(testimony => ({
          id: testimony.id,
          title: testimony.title,
          created_at: testimony.createdAt
        }))
      }
    }
  }
  
  static async deleteUserData(userId: number) {
    const transaction = await db.transaction()
    
    try {
      // Delete user's photos and associated files
      const photos = await transaction('photos')
        .where('user_id', userId)
        .select('file_path', 'thumbnail_path')
      
      for (const photo of photos) {
        // Delete physical files
        await fs.unlink(photo.file_path).catch(() => {})
        await fs.unlink(photo.thumbnail_path).catch(() => {})
      }
      
      // Delete database records
      await transaction('photos').where('user_id', userId).del()
      await transaction('collections').where('user_id', userId).del()
      await transaction('testimonies').where('user_id', userId).del()
      await transaction('users').where('id', userId).del()
      
      await transaction.commit()
      
      return { success: true, message: 'User data deleted successfully' }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  
  static async anonymizeUserData(userId: number) {
    const anonymizedData = {
      username: `anonymous_${crypto.randomUUID()}`,
      email: `anonymous_${crypto.randomUUID()}@deleted.local`,
      first_name: null,
      last_name: null,
      bio: null,
      avatar_url: null,
      is_active: false,
      deleted_at: new Date()
    }
    
    await db.table('users')
      .where('id', userId)
      .update(anonymizedData)
    
    return { success: true, message: 'User data anonymized successfully' }
  }
}
\`\`\`

---

## 🤝 Contributing Guidelines

### **Welcome Contributors!**

Pixinity is an open-source humanitarian project that relies on the global community to help document truth and preserve evidence. We welcome contributions from developers, designers, translators, legal experts, and humanitarian advocates.

### **Code of Conduct**

#### **Our Pledge**
We are committed to making participation in Pixinity a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

#### **Our Standards**
**Positive behaviors include:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community and humanitarian mission
- Showing empathy towards other community members

**Unacceptable behaviors include:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

### **How to Contribute**

#### **1. Getting Started**

**Fork and Clone**
\`\`\`bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/yourusername/pixinity.git
cd pixinity

# Add upstream remote
git remote add upstream https://github.com/originalowner/pixinity.git

# Create a new branch for your feature
git checkout -b feature/your-feature-name
\`\`\`

**Set Up Development Environment**
\`\`\`bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Set up database
npm run db:setup

# Start development server
npm run dev
\`\`\`

#### **2. Types of Contributions**

**🐛 Bug Reports**
- Use the bug report template
- Include steps to reproduce
- Provide screenshots/videos if applicable
- Include browser/OS information
- Check if the issue already exists

**✨ Feature Requests**
- Use the feature request template
- Explain the humanitarian impact
- Provide detailed use cases
- Consider implementation complexity
- Discuss with maintainers first for large features

**💻 Code Contributions**
- Follow the coding standards below
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass
- Follow the pull request process

**🌍 Translations**
- Help translate the platform into new languages
- Review and improve existing translations
- Ensure cultural sensitivity in translations
- Follow the localization guidelines

**📚 Documentation**
- Improve existing documentation
- Add examples and tutorials
- Create video guides
- Translate documentation

**🎨 Design Contributions**
- UI/UX improvements
- Accessibility enhancements
- Mobile responsiveness
- Design system components

### **Development Guidelines**

#### **Coding Standards**

**TypeScript/JavaScript**
\`\`\`typescript
// Use TypeScript for all new code
// Follow these naming conventions:

// Variables and functions: camelCase
const userName = 'john_doe'
const getUserProfile = () => {}

// Constants: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 10485760
const API_ENDPOINTS = {
  PHOTOS: '/api/photos',
  USERS: '/api/users'
}

// Classes and Components: PascalCase
class UserService {}
const PhotoGrid = () => {}

// Files and directories: kebab-case
// photo-grid.tsx
// user-service.ts
// api-endpoints.ts

// Interfaces and Types: PascalCase with descriptive names
interface UserProfile {
  id: number
  username: string
  email: string
}

type PhotoCategory = 'evidence' | 'documentation' | 'testimony'

// Use meaningful variable names
// Good
const isUserAuthenticated = checkAuthStatus()
const filteredPhotos = photos.filter(photo => photo.isPublic)

// Bad
const flag = checkAuthStatus()
const arr = photos.filter(p => p.isPublic)
\`\`\`

**React Components**
\`\`\`tsx
// Use functional components with hooks
// Follow this structure:

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

interface PhotoCardProps {
  photo: Photo
  onLike?: (photoId: number) => void
  className?: string
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  onLike,
  className
}) => {
  // Hooks at the top
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  
  // Effects after hooks
  useEffect(() => {
    setIsLiked(photo.likedBy?.includes(user?.id))
  }, [photo.likedBy, user?.id])
  
  // Event handlers
  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike?.(photo.id)
  }
  
  // Early returns for loading/error states
  if (!photo) {
    return <div>Loading...</div>
  }
  
  // Main render
  return (
    <div className={cn('photo-card', className)}>
      <img 
        src={photo.thumbnailPath || "/placeholder.svg"} 
        alt={photo.title}
        loading="lazy"
      />
      <div className="photo-card-content">
        <h3 className="text-lg font-semibold">{photo.title}</h3>
        <p className="text-sm text-muted-foreground">{photo.description}</p>
        <Button 
          variant={isLiked ? 'default' : 'outline'}
          onClick={handleLike}
        >
          {isLiked ? 'Liked' : 'Like'}
        </Button>
      </div>
    </div>
  )
}
\`\`\`

**CSS/Styling**
\`\`\`css
/* Use Tailwind CSS classes primarily */
/* For custom styles, follow BEM methodology */

.photo-grid {
  @apply grid gap-4 p-4;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.photo-grid__item {
  @apply rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow;
}

.photo-grid__item--featured {
  @apply ring-2 ring-primary;
}

/* Use CSS custom properties for dynamic values */
.photo-card {
  --card-padding: theme('spacing.4');
  --card-radius: theme('borderRadius.lg');
  
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}
\`\`\`

#### **Git Workflow**

**Commit Messages**
Follow the Conventional Commits specification:

\`\`\`bash
# Format: type(scope): description

# Types:
feat: add new testimony submission form
fix: resolve photo upload timeout issue
docs: update API documentation
style: improve button hover states
refactor: extract photo validation logic
test: add unit tests for auth service
chore: update dependencies

# Examples:
git commit -m "feat(upload): add drag and drop file upload"
git commit -m "fix(auth): resolve JWT token expiration handling"
git commit -m "docs(api): add examples for photo endpoints"
git commit -m "test(components): add tests for PhotoGrid component"
\`\`\`

**Branch Naming**
\`\`\`bash
# Feature branches
feature/drag-drop-upload
feature/multi-language-support
feature/evidence-verification

# Bug fix branches
fix/photo-upload-timeout
fix/mobile-navigation-issue
fix/memory-leak-in-grid

# Documentation branches
docs/api-examples
docs/deployment-guide
docs/contributing-guidelines

# Chore branches
chore/update-dependencies
chore/improve-build-process
chore/add-linting-rules
\`\`\`

**Pull Request Process**

1. **Before Creating PR**
\`\`\`bash
# Ensure your branch is up to date
git checkout main
git pull upstream main
git checkout your-feature-branch
git rebase main

# Run tests and linting
npm run test
npm run lint
npm run type-check

# Build the project
npm run build
\`\`\`

2. **PR Template**
\`\`\`markdown
## Description
Brief description of changes and their humanitarian impact.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Security enhancement

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Screenshots/Videos
Include screenshots or videos demonstrating the changes.

## Checklist
- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
\`\`\`

3. **Review Process**
- All PRs require at least 2 reviews
- Security-related changes require review from security team
- UI/UX changes require design review
- Documentation changes require technical writing review

### **Testing Requirements**

**Required Tests for New Features**
\`\`\`typescript
// Unit tests for components
describe('PhotoCard', () => {
  it('renders photo information correctly', () => {
    // Test implementation
  })
  
  it('handles like functionality', () => {
    // Test implementation
  })
  
  it('shows sensitive content warning when appropriate', () => {
    // Test implementation
  })
})

// Integration tests for API endpoints
describe('POST /api/photos/upload', () => {
  it('uploads photo with valid data', async () => {
    // Test implementation
  })
  
  it('validates file size limits', async () => {
    // Test implementation
  })
  
  it('requires authentication', async () => {
    // Test implementation
  })
})

// E2E tests for user flows
test('user can submit testimony', async ({ page }) => {
  // Test implementation
})
\`\`\`

**Test Coverage Requirements**
- Minimum 80% code coverage for new features
- 100% coverage for security-critical functions
- All API endpoints must have integration tests
- Critical user flows must have E2E tests

### **Documentation Standards**

**Code Documentation**
\`\`\`typescript
/**
 * Uploads and processes evidence photos with verification
 * 
 * @param files - Array of image files to upload
 * @param metadata - Additional metadata for the photos
 * @param options - Upload configuration options
 * @returns Promise resolving to upload results
 * 
 * @example
 * \`\`\`typescript
 * const result = await uploadEvidence(
 *   [file1, file2],
 *   { location: 'Gaza', category: 'evidence' },
 *   { verify: true, generateThumbnails: true }
 * )
 * ```
 */
export async function uploadEvidence(
  files: File[],
  metadata: PhotoMetadata,
  options: UploadOptions = {}
): Promise<UploadResult> {
  // Implementation
}
\`\`\`

**API Documentation**
\`\`\`typescript
/**
 * @swagger
 * /api/photos/upload:
 *   post:
 *     summary: Upload evidence photos
 *     description: Upload one or more photos with metadata and verification
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               title:
 *                 type: string
 *                 example: "Evidence from Gaza"
 *               category:
 *                 type: string
 *                 enum: [evidence, documentation, testimony]
 *     responses:
 *       201:
 *         description: Photos uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadResponse'
 */
\`\`\`

### **Security Considerations**

**Security Review Checklist**
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Authentication/authorization checks
- [ ] Rate limiting applied
- [ ] Sensitive data encryption
- [ ] Secure file upload handling
- [ ] Error messages don't leak information
- [ ] Logging doesn't include sensitive data

**Sensitive Data Handling**
\`\`\`typescript
// Never log sensitive information
console.log('User login attempt', { 
  email: user.email, // ❌ Don't log email
  timestamp: new Date() 
})

console.log('User login attempt', { 
  userId: user.id, // ✅ Use ID instead
  timestamp: new Date() 
})

// Sanitize user input
const sanitizedTitle = DOMPurify.sanitize(userInput.title)

// Validate and escape SQL queries
const photos = await db.table('photos')
  .where('user_id', userId) // ✅ Parameterized query
  .select('*')

// Never do this:
const photos = await db.raw(`SELECT * FROM photos WHERE user_id = ${userId}`) // ❌ SQL injection risk
\`\`\`

### **Accessibility Requirements**

**WCAG 2.1 AA Compliance**
- All interactive elements must be keyboard accessible
- Color contrast ratio must be at least 4.5:1
- All images must have descriptive alt text
- Form inputs must have proper labels
- Focus indicators must be visible
- Screen reader compatibility required

**Accessibility Testing**
\`\`\`typescript
// Test keyboard navigation
test('photo grid is keyboard accessible', async ({ page }) => {
  await page.goto('/explore')
  
  // Tab through photos
  await page.keyboard.press('Tab')
  await expect(page.locator('[data-testid="photo-card"]:first-child')).toBeFocused()
  
  // Enter should open photo
  await page.keyboard.press('Enter')
  await expect(page.locator('[data-testid="photo-modal"]')).toBeVisible()
})

// Test screen reader compatibility
test('photo has proper aria labels', async ({ page }) => {
  await page.goto('/explore')
  
  const photo = page.locator('[data-testid="photo-card"]:first-child')
  await expect(photo).toHaveAttribute('aria-label', /Evidence from Gaza/)
})
\`\`\`

### **Performance Guidelines**

**Performance Budget**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms
- Bundle size increase: < 10KB per PR

**Optimization Techniques**
\`\`\`typescript
// Lazy load components
const PhotoModal = lazy(() => import('./PhotoModal'))

// Optimize images
<Image
  src={photo.thumbnailPath || "/placeholder.svg"}
  alt={photo.title}
  width={300}
  height={200}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Use React.memo for expensive components
export const PhotoCard = React.memo<PhotoCardProps>(({ photo, onLike }) => {
  // Component implementation
})

// Debounce search inputs
const debouncedSearch = useDebounce(searchTerm, 300)
\`\`\`

### **Release Process**

**Version Numbering**
We follow Semantic Versioning (SemVer):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

**Release Checklist**
- [ ] All tests pass
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Database migrations tested
- [ ] Deployment scripts verified
- [ ] Rollback plan prepared

### **Community Guidelines**

**Communication Channels**
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Discord**: Real-time community chat
- **Email**: security@pixinity.org for security issues

**Getting Help**
- Check existing issues and documentation first
- Use appropriate labels when creating issues
- Provide detailed information and context
- Be patient and respectful with maintainers

**Recognition**
Contributors are recognized in:
- README contributors section
- Release notes
- Annual contributor report
- Special humanitarian impact awards

---

## 📄 License

### **MIT License**

\`\`\`
MIT License

Copyright (c) 2024 Pixinity Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
\`\`\`

### **Third-Party Licenses**

This project includes several third-party libraries and components. Here are the key licenses:

#### **Core Dependencies**
- **React** (MIT License) - Facebook, Inc.
- **Next.js** (MIT License) - Vercel, Inc.
- **TypeScript** (Apache License 2.0) - Microsoft Corporation
- **Tailwind CSS** (MIT License) - Tailwind Labs, Inc.

#### **UI Components**
- **Radix UI** (MIT License) - WorkOS, Inc.
- **Lucide React** (ISC License) - Lucide Contributors
- **Framer Motion** (MIT License) - Framer B.V.

#### **Backend Dependencies**
- **Express.js** (MIT License) - TJ Holowaychuk and Express Contributors
- **MySQL** (GPL v2 License) - Oracle Corporation
- **bcrypt** (MIT License) - Nick Campbell
- **Sharp** (Apache License 2.0) - Lovell Fuller

#### **Development Tools**
- **Jest** (MIT License) - Facebook, Inc.
- **Playwright** (Apache License 2.0) - Microsoft Corporation
- **ESLint** (MIT License) - JS Foundation

### **Content License**

#### **User-Generated Content**
Users retain ownership of their uploaded content (photos, testimonies, etc.) but grant Pixinity a license to:
- Display and distribute the content for humanitarian purposes
- Use the content for legal documentation and evidence preservation
- Share the content with human rights organizations and legal entities
- Create derivative works for archival and accessibility purposes

#### **Evidence and Testimonies**
Content marked as "evidence" or "testimony" may be subject to additional preservation requirements and may be shared with:
- International legal bodies
- Human rights organizations
- Academic researchers (with appropriate anonymization)
- Journalists and media organizations

### **Privacy and Data Protection**

#### **Data Ownership**
- Users own their personal data and content
- Users can request data export at any time
- Users can request data deletion (subject to legal preservation requirements)
- Anonymization options available for sensitive content

#### **Legal Preservation**
Some content may be preserved for legal purposes even after user deletion requests, including:
- Evidence of war crimes or human rights violations
- Content under legal hold or investigation
- Content required for ongoing legal proceedings

### **Humanitarian Use License**

#### **Special Provisions for Humanitarian Content**
Content submitted as evidence or testimony for humanitarian purposes is subject to additional terms:

1. **Preservation Commitment**: Pixinity commits to preserving this content for historical and legal purposes
2. **Access for Justice**: Content may be made available to legal authorities, human rights organizations, and international courts
3. **Academic Use**: Anonymized content may be used for academic research and education about human rights
4. **Media Access**: Journalists may access content for reporting on humanitarian crises (with appropriate permissions)

#### **Restrictions**
- Content cannot be used for commercial purposes without explicit permission
- Content cannot be used to harm or identify vulnerable individuals
- Content cannot be manipulated or altered without clear indication
- Content cannot be used for propaganda or misinformation

### **Attribution Requirements**

#### **For Developers**
When using Pixinity code in other projects:
\`\`\`
This project includes code from Pixinity (https://github.com/pixinity/pixinity)
Licensed under the MIT License
\`\`\`

#### **For Content Users**
When using Pixinity content:
\`\`\`
Content sourced from Pixinity Platform (https://pixinity.org)
Used under humanitarian documentation license
\`\`\`

### **Disclaimer**

#### **No Warranty**
THE SOFTWARE AND CONTENT ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. PIXINITY MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT:
- The accuracy or completeness of content
- The availability or reliability of the service
- The security of data transmission or storage
- The suitability for any particular purpose

#### **Limitation of Liability**
IN NO EVENT SHALL PIXINITY BE LIABLE FOR:
- Any direct, indirect, incidental, or consequential damages
- Loss of data, profits, or business interruption
- Any damages arising from use of the platform or content
- Any claims related to content accuracy or authenticity

#### **Indemnification**
Users agree to indemnify and hold harmless Pixinity from any claims arising from:
- Their use of the platform
- Content they submit or share
- Violation of these terms or applicable laws
- Infringement of third-party rights

### **Governing Law**

This license and the use of Pixinity are governed by:
- **Primary Jurisdiction**: [To be determined based on hosting location]
- **International Law**: Universal Declaration of Human Rights
- **Humanitarian Law**: Geneva Conventions and Additional Protocols
- **Privacy Law**: GDPR and applicable data protection regulations

### **Contact Information**

For license-related questions or permissions:
- **General Inquiries**: legal@pixinity.org
- **Security Issues**: security@pixinity.org
- **Content Licensing**: content@pixinity.org
- **Academic Use**: research@pixinity.org

---

## 🙏 Acknowledgments

### **Core Team**

**Project Founders**
- **[Founder Name]** - Vision and humanitarian mission
- **[Technical Lead]** - Architecture and development leadership
- **[Design Lead]** - User experience and accessibility

**Development Team**
- **Frontend Engineers** - React, TypeScript, and UI development
- **Backend Engineers** - API, database, and infrastructure
- **DevOps Engineers** - Deployment, monitoring, and security
- **QA Engineers** - Testing, quality assurance, and user experience

**Humanitarian Advisors**
- **Legal Experts** - International law and evidence preservation
- **Human Rights Advocates** - Mission guidance and ethical oversight
- **Trauma Specialists** - Sensitive content handling and user support
- **Security Experts** - Data protection and user safety

### **Open Source Community**

**Major Contributors**
We extend our deepest gratitude to the developers, designers, translators, and advocates who have contributed to Pixinity:

- **[@contributor1]** - Multi-language support implementation
- **[@contributor2]** - Evidence verification system
- **[@contributor3]** - Mobile accessibility improvements
- **[@contributor4]** - Security enhancements and audit
- **[@contributor5]** - Documentation and user guides

**Translation Team**
- **Arabic**: [Translator names] - Ensuring accessibility for Arabic-speaking communities
- **Spanish**: [Translator names] - Latin American and Spanish community support
- **French**: [Translator names] - Francophone community accessibility
- **German**: [Translator names] - European community support
- **Chinese**: [Translator names] - Asian community accessibility

### **Technology Partners**

**Infrastructure and Services**
- **[Hosting Provider]** - Reliable and secure hosting infrastructure
- **[CDN Provider]** - Global content delivery and performance
- **[Database Provider]** - Scalable and secure data storage
- **[Email Service]** - Reliable communication and notifications
- **[Monitoring Service]** - Application performance and uptime monitoring

**Development Tools**
- **Vercel** - Deployment platform and developer experience
- **GitHub** - Code hosting and collaboration platform
- **npm** - Package management and distribution
- **TypeScript** - Type-safe development environment

### **Humanitarian Organizations**

**Partner Organizations**
We work closely with humanitarian organizations worldwide:

- **[Human Rights Organization 1]** - Evidence collection and verification
- **[Legal Aid Organization]** - Legal documentation and support
- **[Journalism Collective]** - Media access and reporting
- **[Academic Institution]** - Research and documentation standards
- **[International Court/Tribunal]** - Legal evidence preservation

**Advisory Board**
- **[Legal Expert Name]** - International humanitarian law
- **[Journalist Name]** - Ethical reporting and media standards
- **[Academic Name]** - Digital preservation and archival science
- **[Advocate Name]** - Human rights and victim advocacy
- **[Technologist Name]** - Privacy and security in humanitarian tech

### **Special Recognition**

**Inspiration and Motivation**
This project is dedicated to:

- **Survivors and Witnesses** - Whose courage to share their stories drives our mission
- **Journalists and Documentarians** - Who risk their lives to bring truth to light
- **Human Rights Defenders** - Who fight tirelessly for justice and accountability
- **Legal Professionals** - Who work to ensure evidence is preserved and justice is served
- **Technology for Good Community** - Who believe in using technology for humanitarian impact

**In Memory Of**
We honor the memory of those who have lost their lives in conflicts and humanitarian crises, and we commit to preserving their stories and ensuring their voices are not forgotten.

### **Research and Standards**

**Academic Contributions**
- **Digital Preservation Standards** - Library of Congress and Dublin Core Metadata Initiative
- **Humanitarian Technology Research** - MIT Center for Collective Intelligence
- **Trauma-Informed Design** - Stanford d.school and IDEO.org
- **Accessibility Research** - Web Accessibility Initiative (WAI) and A11Y Project

**Industry Standards**
- **Web Content Accessibility Guidelines (WCAG)** - W3C accessibility standards
- **OWASP Security Guidelines** - Web application security best practices
- **ISO 27001** - Information security management standards
- **Dublin Core Metadata** - Digital resource description standards

### **Community Support**

**Beta Testers and Early Adopters**
- **Humanitarian Organizations** - Who provided feedback during development
- **Legal Professionals** - Who tested evidence preservation features
- **Journalists** - Who validated content verification systems
- **Accessibility Advocates** - Who ensured inclusive design
- **Security Researchers** - Who helped identify and fix vulnerabilities

**Feedback and Suggestions**
We thank the hundreds of community members who provided:
- Feature requests and improvement suggestions
- Bug reports and testing feedback
- Translation corrections and cultural insights
- Accessibility testing and recommendations
- Security audits and vulnerability reports

### **Financial Support**

**Grants and Funding**
- **[Foundation Name]** - Initial development funding
- **[Grant Program]** - Humanitarian technology development
- **[Crowdfunding Platform]** - Community-supported development
- **[Corporate Sponsor]** - Infrastructure and operational support

**In-Kind Contributions**
- **Cloud hosting credits** - Enabling global accessibility
- **Development tools licenses** - Supporting efficient development
- **Security auditing services** - Ensuring platform safety
- **Legal consultation** - Guidance on humanitarian law compliance
- **Design and UX services** - Creating inclusive user experiences

### **Technical Acknowledgments**

**Open Source Libraries**
We build upon the shoulders of giants in the open source community:

- **React Team** - For the foundational UI library
- **Next.js Team** - For the full-stack React framework
- **Tailwind CSS Team** - For the utility-first CSS framework
- **Radix UI Team** - For accessible UI primitives
- **TypeScript Team** - For type-safe JavaScript development
- **Node.js Contributors** - For the JavaScript runtime
- **MySQL Team** - For the reliable database system

**Security and Privacy Tools**
- **OWASP Foundation** - Security guidelines and tools
- **Let's Encrypt** - Free SSL certificates for secure connections
- **Tor Project** - Privacy and anonymity research
- **Electronic Frontier Foundation** - Digital rights advocacy

### **Inspiration from Other Projects**

**Humanitarian Technology**
- **Ushahidi** - Crisis mapping and crowdsourced information
- **OpenIDEO** - Human-centered design for social impact
- **Crisis Text Line** - Technology for mental health support
- **Witness** - Video technology for human rights documentation

**Open Source Inspiration**
- **Wikipedia** - Collaborative knowledge preservation
- **Internet Archive** - Digital preservation and access
- **Signal** - Privacy-focused communication
- **Tor Browser** - Anonymous web browsing

### **Future Collaborations**

**Planned Partnerships**
We are actively working with:
- **International Criminal Court** - Evidence preservation standards
- **Amnesty International** - Human rights documentation
- **Reporters Without Borders** - Press freedom and journalist safety
- **University Research Centers** - Academic collaboration and research
- **Technology Companies** - Infrastructure and tool development

### **How to Get Involved**

**Join Our Community**
- **Developers**: Contribute code, review PRs, and improve the platform
- **Designers**: Help create inclusive and accessible user experiences
- **Translators**: Make Pixinity accessible in more languages
- **Legal Experts**: Advise
