# Lindberg Safaris Backend - Setup & Usage Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn
- Sanity account (already configured)
- Cloudinary account (already configured)

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Environment Variables**
The `.env` file is already configured with your credentials:
- Sanity Project ID: `nk22ixww`
- Cloudinary Cloud: `di5ga8z9i`
- Server Port: `5000`

3. **Start the Backend Server**
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Testing the API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Upload Image:**
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "image=@/path/to/image.jpg"
```

---

## 📁 Project Structure

```
backend/
├── .env                    # Environment variables (configured)
├── server.js              # Express server entry point
├── config/
│   ├── sanity.js          # Sanity client setup
│   └── cloudinary.js      # Cloudinary configuration
├── routes/
│   ├── upload.js          # Image upload endpoints
│   └── content.js         # Content fetch endpoints
├── middleware/
│   └── upload.js          # Multer file upload middleware
├── schemas/               # Sanity CMS schemas
│   ├── tour.js
│   ├── destination.js
│   ├── blogPost.js
│   ├── service.js
│   └── index.js
└── uploads/               # Temporary file storage
```

---

## 🔌 API Endpoints

### Upload Endpoints

**POST** `/api/upload`
- Upload image to Cloudinary
- Body: `multipart/form-data` with `image` field
- Optional: `documentType` field
- Returns: Cloudinary URL and metadata

**GET** `/api/upload/images`
- Fetch all stored images from Sanity
- Returns: Array of image objects

**DELETE** `/api/upload/:publicId`
- Delete image from Cloudinary
- Params: `publicId` - Cloudinary public ID
- Returns: Success message

### Content Endpoints

**GET** `/api/content/tours`
- Fetch all tours from Sanity

**GET** `/api/content/tours/:id`
- Fetch single tour by ID

**GET** `/api/content/destinations`
- Fetch all destinations

**GET** `/api/content/destinations/:id`
- Fetch single destination with related tours

**GET** `/api/content/blog`
- Fetch all blog posts

**GET** `/api/content/blog/:id`
- Fetch single blog post

**GET** `/api/content/services`
- Fetch all services

---

## 🎨 Sanity Studio Setup

### Option 1: Use Sanity Studio (Recommended)

1. **Install Sanity CLI globally:**
```bash
npm install -g @sanity/cli
```

2. **Initialize Sanity Studio in a separate directory:**
```bash
cd ..
sanity init
```

When prompted:
- Select "Use existing project"
- Enter project ID: `nk22ixww`
- Choose dataset: `production`

3. **Copy schemas to Sanity Studio:**
```bash
cp backend/schemas/* sanity-studio/schemas/
```

4. **Start Sanity Studio:**
```bash
cd sanity-studio
sanity start
```

Studio will be available at `http://localhost:3333`

### Option 2: Use Sanity.io Dashboard

Visit: `https://www.sanity.io/manage/personal/project/nk22ixww`

---

## 🔗 Frontend Integration

### 1. Install Frontend Environment

```bash
cd my-react-app
```

The `.env` file is already created with:
```
VITE_API_URL=http://localhost:5000/api
```

### 2. Use the API Client

The API client is located at `src/lib/api.ts`. Example usage:

```typescript
import api from '@/lib/api';

// Fetch all tours
const tours = await api.tours.getAll();

// Fetch single tour
const tour = await api.tours.getById('tour-id');

// Upload image
const file = event.target.files[0];
const result = await api.upload.uploadImage(file);
console.log(result.data.url); // Cloudinary URL
```

### 3. Update Components

Example: Update `Tours.tsx` to fetch from API:

```typescript
import { useState, useEffect } from 'react';
import api from '@/lib/api';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.tours.getAll();
        setTours(response.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    // Render tours...
  );
};
```

---

## 📝 Adding Content to Sanity

### Method 1: Via Sanity Studio

1. Start Sanity Studio (see above)
2. Navigate to the content type (Tours, Destinations, etc.)
3. Click "Create new"
4. Fill in the fields
5. For images:
   - Upload to Cloudinary first via the backend API
   - Copy the returned URL
   - Paste into the image URL field in Sanity

### Method 2: Via API (Programmatic)

```javascript
const sanityClient = require('./config/sanity');

// Create a new tour
const newTour = await sanityClient.create({
  _type: 'tour',
  title: 'Great Migration Safari',
  location: 'Masai Mara, Kenya',
  duration: '7 Days / 6 Nights',
  price: 2450,
  // ... other fields
});
```

---

## 🧪 Testing Workflow

### 1. Test Image Upload

```bash
# Upload an image
curl -X POST http://localhost:5000/api/upload \
  -F "image=@test-image.jpg"

# Response will include Cloudinary URL
```

### 2. Add Content to Sanity

Use Sanity Studio or the Sanity dashboard to create content documents.

### 3. Test Frontend Fetch

```bash
# In my-react-app directory
npm run dev

# Visit http://localhost:5173
# Check browser console for API calls
```

---

## 🔒 Security Notes

- ✅ API keys are in `.env` (not committed to git)
- ✅ `.gitignore` configured to exclude `.env`
- ⚠️ CORS is currently open for development
- ⚠️ For production, update CORS in `server.js`:

```javascript
app.use(cors({
  origin: 'https://your-production-domain.com',
  credentials: true,
}));
```

---

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables in platform dashboard
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Update `.env` with production API URL
2. Build: `npm run build`
3. Deploy `dist/` folder

---

## 📊 Monitoring

### Check Server Status

```bash
curl http://localhost:5000/api/health
```

### View Server Logs

```bash
# In backend directory
npm run dev

# Logs will show:
# - Incoming requests
# - Upload status
# - Errors
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to Sanity"
- Check `SANITY_API_TOKEN` in `.env`
- Verify project ID: `nk22ixww`

### Issue: "Cloudinary upload failed"
- Check Cloudinary credentials in `.env`
- Verify image file size (max 5MB)

### Issue: "CORS error in frontend"
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`

---

## 📚 Next Steps

1. ✅ Backend is ready to use
2. ✅ Schemas are defined
3. ⏳ Add content via Sanity Studio
4. ⏳ Update frontend components to use API
5. ⏳ Test full integration
6. ⏳ Deploy to production

---

## 🆘 Support

For issues:
- Check server logs: `npm run dev` in backend
- Check browser console for frontend errors
- Verify environment variables are set correctly
