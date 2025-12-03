# Frontend Integration - Quick Guide

## ✅ What Was Updated

The frontend has been updated to fetch real data from your Sanity CMS via the backend API:

### Updated Pages:
- ✅ **Tours** (`/tours`) - Now fetches from `/api/content/tours`
- ✅ **Destinations** (`/destinations`) - Now fetches from `/api/content/destinations`
- ✅ **Blog** (`/blog`) - Now fetches from `/api/content/blog`

### Features Added:
- Loading states with spinners
- Error handling with helpful messages
- Empty state messages when no content exists
- Automatic fallback images if none provided

---

## 🚀 How to See Your Content

### 1. Make Sure Backend is Running
```bash
# In terminal (should already be running)
cd d:/lindebergsafaris/backend
npm run dev
```

### 2. Start Frontend
```bash
# In a new terminal
cd d:/lindebergsafaris/my-react-app
npm run dev
```

### 3. View Your Content
Open `http://localhost:5173` in your browser and navigate to:
- `/tours` - See your tours from Sanity
- `/destinations` - See your destinations
- `/blog` - See your blog posts

---

## 📝 Adding Content in Sanity Studio

### Quick Steps:

1. **Open Sanity Studio** (if not already open):
   - Web: https://www.sanity.io/manage/personal/project/nk22ixww
   - Local: http://localhost:3333 (if you set it up)

2. **Upload an Image First**:
```bash
curl -X POST http://localhost:5000/api/upload -F "image=@path/to/your/image.jpg"
```
Copy the returned Cloudinary URL.

3. **Create a Tour**:
   - Click "Tour" → "Create new"
   - Fill in required fields:
     - Title: "Serengeti Wildlife Safari"
     - Slug: Click "Generate"
     - Location: "Serengeti, Tanzania"
     - Description: "Experience incredible wildlife..."
     - Duration: "5 Days / 4 Nights"
     - Price: 1850
   - Under Images → Add item → Paste Cloudinary URL
   - Click "Publish"

4. **Refresh Frontend**:
   - Go to `http://localhost:5173/tours`
   - Your tour should appear!

---

## 🔍 Troubleshooting

### "Error loading tours"
- ✅ Check backend is running: `http://localhost:5000/api/health`
- ✅ Check `.env` file in `my-react-app` has: `VITE_API_URL=http://localhost:5000/api`
- ✅ Check browser console for errors (F12)

### "No tours found"
- ✅ Add content in Sanity Studio
- ✅ Make sure you clicked "Publish" (not just "Save")
- ✅ Test API directly: `curl http://localhost:5000/api/content/tours`

### Images not showing
- ✅ Make sure you uploaded image to Cloudinary first
- ✅ Check the URL is pasted correctly in Sanity
- ✅ URL should start with `https://res.cloudinary.com/`

---

## 🎯 Next Steps

1. Add 2-3 sample tours in Sanity
2. Add 2-3 destinations
3. Add a blog post
4. View them all in the frontend!

The content will update in real-time as you add/edit in Sanity Studio.
