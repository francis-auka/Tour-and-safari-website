# Sanity Studio Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Sanity Studio Directory

```bash
# From the lindebergsafaris root directory
cd d:/lindebergsafaris
mkdir sanity-studio
cd sanity-studio
```

### Step 2: Initialize Sanity Studio

```bash
# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli

# Initialize the studio
sanity init
```

**When prompted, select:**
- ✅ "Use existing project"
- Project ID: `nk22ixww`
- Dataset: `production`
- Output path: `.` (current directory)

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Copy Schemas

```bash
# Copy the schemas from backend
cp ../backend/schemas/tour.js ./schemas/
cp ../backend/schemas/destination.js ./schemas/
cp ../backend/schemas/blogPost.js ./schemas/
cp ../backend/schemas/service.js ./schemas/
cp ../backend/schemas/index.js ./schemas/
```

### Step 5: Update sanity.config.js

The file should look like this:

```javascript
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import schemas from './schemas'

export default defineConfig({
  name: 'lindberg-safaris',
  title: 'Lindberg Safaris CMS',
  projectId: 'nk22ixww',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemas,
  },
})
```

### Step 6: Start Sanity Studio

```bash
npm run dev
```

**Studio will be available at:** http://localhost:3333

---

## 🎯 Using Sanity Studio

### Adding a Tour

1. Open Studio at http://localhost:3333
2. Click **"Tour"** in the sidebar
3. Click **"Create new Tour"**
4. Fill in the fields:
   - **Title:** "Great Migration Safari"
   - **Slug:** Click "Generate" (auto-generates from title)
   - **Location:** "Masai Mara, Kenya"
   - **Description:** Your tour description
   - **Duration:** "7 Days / 6 Nights"
   - **Group Size:** "Max 6 People"
   - **Price:** 2450
   - **Rating:** 4.9
   - **Reviews:** 124

5. **For Images:**
   - First, upload image via backend API:
     ```bash
     curl -X POST http://localhost:5000/api/upload -F "image=@path/to/image.jpg"
     ```
   - Copy the returned Cloudinary URL
   - In Sanity Studio, click "Add item" under Images
   - Paste the URL in the "Image URL" field
   - Add alt text

6. Click **"Publish"**

### Adding Other Content

Follow the same process for:
- **Destinations** (click "Destination" → "Create new")
- **Blog Posts** (click "Blog Post" → "Create new")
- **Services** (click "Service" → "Create new")

---

## 🖼️ Image Upload Workflow

### Method 1: Via Backend API (Recommended)

```bash
# Upload image to Cloudinary
curl -X POST http://localhost:5000/api/upload \
  -F "image=@safari-lion.jpg"

# Response will include:
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/di5ga8z9i/image/upload/v.../image.jpg",
    "publicId": "lindberg-safaris/abc123"
  }
}

# Copy the URL and paste it in Sanity Studio
```

### Method 2: Using Postman/Thunder Client

1. Open Postman or VS Code Thunder Client
2. Create POST request to `http://localhost:5000/api/upload`
3. Body type: `form-data`
4. Add field: `image` (type: File)
5. Select your image file
6. Send request
7. Copy the returned URL

---

## ✅ Verification

After adding content in Sanity Studio:

1. **Check in Studio:** Content should appear in the list
2. **Test API:** 
   ```bash
   curl http://localhost:5000/api/content/tours
   ```
3. **View in Frontend:** Your React app will fetch this data

---

## 🚀 Quick Commands Reference

```bash
# Start Backend (Terminal 1)
cd d:/lindebergsafaris/backend
npm run dev

# Start Sanity Studio (Terminal 2)
cd d:/lindebergsafaris/sanity-studio
npm run dev

# Start Frontend (Terminal 3)
cd d:/lindebergsafaris/my-react-app
npm run dev
```

Now you have:
- Backend API: http://localhost:5000
- Sanity Studio: http://localhost:3333
- Frontend: http://localhost:5173

---

## 📝 Sample Content to Add

### Sample Tour
- **Title:** Serengeti Wildlife Safari
- **Location:** Serengeti, Tanzania
- **Duration:** 5 Days / 4 Nights
- **Price:** 1850
- **Description:** Experience the incredible wildlife of the Serengeti...

### Sample Destination
- **Name:** Kenya
- **Tagline:** Land of the Big Five
- **Description:** Kenya offers some of the best safari experiences...

### Sample Blog Post
- **Title:** Best Time to Visit Masai Mara
- **Category:** Travel Tips
- **Author:** Safari Expert
- **Content:** The Masai Mara is spectacular year-round, but...

---

## 🆘 Troubleshooting

**Can't access Studio:**
- Ensure you're logged into Sanity.io
- Check project ID is correct: `nk22ixww`

**Schemas not showing:**
- Verify schemas are copied to `sanity-studio/schemas/`
- Check `schemas/index.js` exports all schemas
- Restart Studio: `npm run dev`

**Images not uploading:**
- Ensure backend is running on port 5000
- Check Cloudinary credentials in backend `.env`
- Verify image is under 5MB
