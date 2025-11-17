# New Blog API Documentation (v2)

## Base URL: `/api/v2/blogs`

This is a comprehensive Medium-like blog system with image upload capabilities, search functionality, and full CRUD operations.

## Features
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Multiple image uploads (Featured, Banner, Content images)
- ✅ Image file validation and size limits (20MB per file)
- ✅ Search functionality with full-text search
- ✅ Pagination support
- ✅ Category and tag management
- ✅ Featured blogs
- ✅ Popular blogs (by views/likes)
- ✅ Like functionality
- ✅ View tracking
- ✅ SEO metadata support

## Database Schema

```sql
CREATE TABLE newblog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(500),
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    excerpt TEXT,
    author_name VARCHAR(255) NOT NULL,
    featured_image VARCHAR(500),
    banner_image VARCHAR(500),
    images JSON,
    reading_time INT DEFAULT 0,
    word_count INT DEFAULT 0,
    status ENUM('draft', 'published', 'archived') DEFAULT 'published',
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    meta_title VARCHAR(255),
    meta_description TEXT,
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    category VARCHAR(100),
    tags JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## API Endpoints

### 1. Get All Blogs
```
GET /api/v2/blogs
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of blogs per page (default: 10)
- `category` (optional): Filter by category
- `status` (optional): Filter by status (default: 'published')
- `featured` (optional): Filter featured blogs (true/false)

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "title": "Sample Blog Title",
            "subtitle": "Blog subtitle",
            "slug": "sample-blog-title",
            "content": "Blog content...",
            "excerpt": "Short description",
            "author_name": "John Doe",
            "featured_image": "/uploads/blog-123456789.jpg",
            "banner_image": "/uploads/banner-123456789.jpg",
            "images": [
                {
                    "url": "/uploads/content-123456789.jpg",
                    "alt": "Image description",
                    "caption": "Image caption"
                }
            ],
            "reading_time": 5,
            "word_count": 1000,
            "status": "published",
            "published_at": "2025-08-14T10:00:00.000Z",
            "views_count": 150,
            "likes_count": 25,
            "category": "Technology",
            "tags": ["web development", "javascript"],
            "is_featured": false,
            "created_at": "2025-08-14T10:00:00.000Z",
            "updated_at": "2025-08-14T10:00:00.000Z"
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalBlogs": 50,
        "hasNextPage": true,
        "hasPrevPage": false
    }
}
```

### 2. Get Single Blog by Slug
```
GET /api/v2/blogs/{slug}
```

**Response:**
```json
{
    "success": true,
    "data": {
        // Same blog object structure as above
        // View count is automatically incremented
    }
}
```

### 3. Create New Blog
```
POST /api/v2/blogs
```

**Content-Type:** `multipart/form-data`

**Form Data:**
- `title` (required): Blog title
- `subtitle` (optional): Blog subtitle
- `content` (required): Blog content (HTML supported)
- `excerpt` (optional): Short description
- `author_name` (required): Author name
- `category` (optional): Blog category
- `tags` (optional): JSON array or comma-separated string
- `meta_title` (optional): SEO title
- `meta_description` (optional): SEO description
- `status` (optional): 'draft', 'published', 'archived' (default: 'published')
- `is_featured` (optional): true/false (default: false)
- `featured_image` (optional): Featured image file
- `banner_image` (optional): Banner image file
- `content_images` (optional): Array of content images (max 15)

**File Limits:**
- Maximum file size: 20MB per file
- Allowed formats: JPEG, JPG, PNG, GIF, WebP
- Maximum files per request: 20

**Response:**
```json
{
    "success": true,
    "message": "Blog created successfully",
    "data": {
        "blogId": 1,
        "slug": "sample-blog-title"
    }
}
```

### 4. Update Blog
```
PUT /api/v2/blogs/{id}
```

**Content-Type:** `multipart/form-data`

Same form data as create, all fields optional. Files will replace existing ones.

**Response:**
```json
{
    "success": true,
    "message": "Blog updated successfully"
}
```

### 5. Delete Blog
```
DELETE /api/v2/blogs/{id}
```

**Response:**
```json
{
    "success": true,
    "message": "Blog deleted successfully"
}
```

### 6. Search Blogs
```
GET /api/v2/blogs/search?q={search_term}
```

**Query Parameters:**
- `q` (required): Search term
- `page` (optional): Page number
- `limit` (optional): Results per page

**Response:**
```json
{
    "success": true,
    "data": [
        // Array of matching blogs
    ],
    "pagination": {
        // Pagination info
    }
}
```

### 7. Get Featured Blogs
```
GET /api/v2/blogs/featured?limit=5
```

**Response:**
```json
{
    "success": true,
    "data": [
        // Array of featured blogs
    ]
}
```

### 8. Get Popular Blogs
```
GET /api/v2/blogs/popular?limit=10
```

**Response:**
```json
{
    "success": true,
    "data": [
        // Array of popular blogs (sorted by views/likes)
    ]
}
```

### 9. Get All Categories
```
GET /api/v2/blogs/categories
```

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "category": "Technology",
            "count": 25
        },
        {
            "category": "Design",
            "count": 15
        }
    ]
}
```

### 10. Get Blogs by Category
```
GET /api/v2/blogs/category/{category}
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Results per page

**Response:**
```json
{
    "success": true,
    "data": [
        // Array of blogs in the category
    ],
    "pagination": {
        // Pagination info
    }
}
```

### 11. Like Blog
```
POST /api/v2/blogs/{id}/like
```

**Response:**
```json
{
    "success": true,
    "message": "Blog liked successfully"
}
```

### 12. Upload Single Image (Utility)
```
POST /api/v2/blogs/upload-image
```

**Content-Type:** `multipart/form-data`
**Form Data:**
- `image`: Image file

**Response:**
```json
{
    "success": true,
    "message": "Image uploaded successfully",
    "data": {
        "url": "/uploads/blog-123456789.jpg",
        "filename": "blog-123456789.jpg",
        "originalName": "my-image.jpg",
        "size": 1024000
    }
}
```

## Error Responses

All endpoints return errors in this format:

```json
{
    "success": false,
    "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `400`: Bad Request (validation errors, file size limits)
- `404`: Not Found (blog not found)
- `500`: Internal Server Error

## Frontend Integration Examples

### Creating a Blog with Images

```javascript
const formData = new FormData();
formData.append('title', 'My New Blog Post');
formData.append('content', '<p>This is my blog content...</p>');
formData.append('author_name', 'John Doe');
formData.append('category', 'Technology');
formData.append('tags', JSON.stringify(['web', 'development']));

// Add images
formData.append('featured_image', featuredImageFile);
formData.append('banner_image', bannerImageFile);
formData.append('content_images', contentImage1);
formData.append('content_images', contentImage2);

fetch('/api/v2/blogs', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

### Fetching Blogs with Pagination

```javascript
const fetchBlogs = async (page = 1, category = null) => {
    const params = new URLSearchParams({
        page: page,
        limit: 10
    });
    
    if (category) {
        params.append('category', category);
    }
    
    const response = await fetch(`/api/v2/blogs?${params}`);
    const data = await response.json();
    return data;
};
```

## Notes

- All images are automatically stored in the `/uploads` directory
- Reading time is calculated automatically (200 words per minute average)
- Word count is calculated automatically
- Slugs are auto-generated from titles and must be unique
- JSON fields (tags, images) are automatically parsed
- Full-text search works on title, content, excerpt, and author_name
- View counts are incremented automatically when fetching individual blogs
- Old images are automatically deleted when updating blogs with new images
