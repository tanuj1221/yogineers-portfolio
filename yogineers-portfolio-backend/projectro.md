# Projects API Documentation

## Overview
Complete CRUD API for managing projects with video and image upload capabilities using Multer for local file storage.

## Base URL
`http://localhost:5000/api`

## Authentication
No authentication required (public API)

## File Upload Specifications

### Supported File Types
- **Videos**: MP4, AVI, MOV, WMV, FLV, WebM, MKV
- **Images**: JPEG, JPG, PNG, GIF, WebP, BMP, SVG

### File Size Limits
- **Videos**: 100MB per file
- **Images**: 100MB per file
- **Total Files**: Maximum 21 files per request (1 video + 1 thumbnail + 19 photos)

### Upload Fields
- `project_video`: Single video file (optional)
- `project_thumbnail`: Single thumbnail image (optional)
- `project_photos`: Multiple project photos, up to 19 files (optional)

## API Endpoints

### 1. Get All Projects
**GET** `/projects`

Retrieves all projects with pagination and optional filtering.

#### Query Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number for pagination |
| limit | integer | 10 | Number of projects per page |
| service_id | integer | null | Filter by service ID |

#### Response Example
```json
{
    "success": true,
    "data": [
        {
            "project_id": 11,
            "service_id": 1,
            "project_name": "ProctoNova",
            "project_video": "/uploads/project-video-1234567890.mp4",
            "project_photos": [
                "/uploads/project-photo-1234567891.png",
                "/uploads/project-photo-1234567892.png"
            ],
            "project_thumbnail": "/uploads/project-thumbnail-1234567893.png",
            "project_description": "AI-powered online exam platform...",
            "created_at": "2025-06-26T13:32:40.000Z",
            "updated_at": "2025-06-26T13:32:40.000Z"
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalProjects": 45,
        "hasNextPage": true,
        "hasPrevPage": false
    }
}
```

### 2. Get Project by ID
**GET** `/projects/:id`

Retrieves a single project by its ID.

#### URL Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Project ID |

#### Response Example
```json
{
    "success": true,
    "data": {
        "project_id": 11,
        "service_id": 1,
        "project_name": "ProctoNova",
        "project_video": "/uploads/project-video-1234567890.mp4",
        "project_photos": [
            "/uploads/project-photo-1234567891.png",
            "/uploads/project-photo-1234567892.png"
        ],
        "project_thumbnail": "/uploads/project-thumbnail-1234567893.png",
        "project_description": "AI-powered online exam platform...",
        "created_at": "2025-06-26T13:32:40.000Z",
        "updated_at": "2025-06-26T13:32:40.000Z"
    }
}
```

### 3. Get Projects by Service ID
**GET** `/projects/service/:service_id`

Retrieves projects filtered by service ID with pagination.

#### URL Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| service_id | integer | Service ID to filter by |

#### Query Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number for pagination |
| limit | integer | 10 | Number of projects per page |

### 4. Search Projects
**GET** `/projects/search`

Search projects by name or description.

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | Search term |
| page | integer | No | Page number (default: 1) |
| limit | integer | No | Results per page (default: 10) |

#### Response Example
```json
{
    "success": true,
    "data": [
        {
            "project_id": 11,
            "project_name": "ProctoNova",
            "project_description": "AI-powered online exam platform..."
        }
    ],
    "searchTerm": "AI platform",
    "pagination": {
        "currentPage": 1,
        "limit": 10
    }
}
```

### 5. Get Projects with Service Details
**GET** `/projects/with-services`

Retrieves projects with associated service information.

#### Query Parameters
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number for pagination |
| limit | integer | 10 | Number of projects per page |

### 6. Create New Project
**POST** `/projects`

Creates a new project with optional file uploads.

#### Request Headers
```
Content-Type: multipart/form-data
```

#### Form Data Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| service_id | integer | Yes | ID of the associated service |
| project_name | string | Yes | Name of the project |
| project_description | text | Yes | Detailed description of the project |
| project_video | file | No | Video file for the project |
| project_thumbnail | file | No | Thumbnail image for the project |
| project_photos | file[] | No | Array of project photos (max 19) |

#### Example Request (using curl)
```bash
curl -X POST http://localhost:5000/api/projects \
  -F "service_id=1" \
  -F "project_name=My New Project" \
  -F "project_description=This is a detailed description of my project..." \
  -F "project_video=@/path/to/video.mp4" \
  -F "project_thumbnail=@/path/to/thumbnail.jpg" \
  -F "project_photos=@/path/to/photo1.jpg" \
  -F "project_photos=@/path/to/photo2.jpg"
```

#### Response Example
```json
{
    "success": true,
    "message": "Project created successfully",
    "data": {
        "project_id": 15,
        "service_id": 1,
        "project_name": "My New Project",
        "project_video": "/uploads/project-video-1234567890.mp4",
        "project_photos": [
            "/uploads/project-photo-1234567891.jpg",
            "/uploads/project-photo-1234567892.jpg"
        ],
        "project_thumbnail": "/uploads/project-thumbnail-1234567893.jpg",
        "project_description": "This is a detailed description...",
        "created_at": "2025-08-15T10:30:00.000Z",
        "updated_at": "2025-08-15T10:30:00.000Z"
    }
}
```

### 7. Update Project
**PUT** `/projects/:id`

Updates an existing project. Files are replaced if new ones are uploaded.

#### URL Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Project ID to update |

#### Request Headers
```
Content-Type: multipart/form-data
```

#### Form Data Fields
Same as Create Project endpoint. All fields are required, but files are optional (existing files will be kept if not replaced).

#### Response Example
```json
{
    "success": true,
    "message": "Project updated successfully",
    "data": {
        "project_id": 15,
        "service_id": 1,
        "project_name": "Updated Project Name",
        "project_video": "/uploads/project-video-1234567890.mp4",
        "project_photos": [
            "/uploads/project-photo-1234567891.jpg"
        ],
        "project_thumbnail": "/uploads/project-thumbnail-1234567893.jpg",
        "project_description": "Updated description...",
        "created_at": "2025-08-15T10:30:00.000Z",
        "updated_at": "2025-08-15T11:45:00.000Z"
    }
}
```

### 8. Delete Project
**DELETE** `/projects/:id`

Deletes a project and all associated files.

#### URL Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Project ID to delete |

#### Response Example
```json
{
    "success": true,
    "message": "Project deleted successfully"
}
```

### 9. Upload Single Media File (Utility Endpoint)
**POST** `/projects/upload-media`

Utility endpoint for uploading a single media file.

#### Request Headers
```
Content-Type: multipart/form-data
```

#### Form Data Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| media | file | Yes | Image or video file |

#### Response Example
```json
{
    "success": true,
    "message": "Video uploaded successfully",
    "data": {
        "url": "/uploads/project-video-1234567890.mp4",
        "filename": "project-video-1234567890.mp4",
        "originalName": "my-video.mp4",
        "size": 15728640,
        "type": "video",
        "mimetype": "video/mp4"
    }
}
```

## Legacy Endpoints

### Get Projects by Service ID (Legacy)
**GET** `/services/:service_id/projects`

Legacy endpoint for backward compatibility. Returns projects for a specific service without pagination.

## Error Responses

### 400 Bad Request
```json
{
    "success": false,
    "message": "Missing required fields: service_id, project_name, project_description"
}
```

### 404 Not Found
```json
{
    "success": false,
    "message": "Project not found"
}
```

### 500 Internal Server Error
```json
{
    "success": false,
    "message": "Error creating project",
    "error": "Database connection failed"
}
```

## File Upload Errors

### File Size Too Large
```json
{
    "success": false,
    "message": "File size too large. Maximum size is 100MB per file."
}
```

### Too Many Files
```json
{
    "success": false,
    "message": "Too many files. Maximum 21 files allowed (1 video + 1 thumbnail + 19 photos)."
}
```

### Invalid File Type
```json
{
    "success": false,
    "message": "Only video files (MP4, AVI, MOV, WMV, FLV, WebM, MKV) are allowed for project video!"
}
```

## Database Schema

### Projects Table Structure
```sql
project_id          - INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
service_id          - INT UNSIGNED NOT NULL (Foreign Key)
project_name        - VARCHAR(255) NOT NULL
project_video       - VARCHAR(500) NULL
project_photos      - TEXT NULL (JSON array of photo URLs)
project_thumbnail   - VARCHAR(500) NULL
project_description - TEXT NOT NULL
created_at          - TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at          - TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

## File Storage

### File Naming Convention
- **Videos**: `project-video-{timestamp}-{random}.{ext}`
- **Thumbnails**: `project-thumbnail-{timestamp}-{random}.{ext}`
- **Photos**: `project-photo-{timestamp}-{random}.{ext}`

### Storage Location
All uploaded files are stored in the `/uploads` directory and accessible via HTTP at `/uploads/{filename}`.

### File Access
Files can be accessed directly via:
```
http://localhost:5000/uploads/{filename}
```

## Example Usage

### JavaScript Fetch API
```javascript
// Create a new project with files
const formData = new FormData();
formData.append('service_id', '1');
formData.append('project_name', 'My Project');
formData.append('project_description', 'Project description');
formData.append('project_video', videoFile);
formData.append('project_thumbnail', thumbnailFile);
formData.append('project_photos', photoFile1);
formData.append('project_photos', photoFile2);

fetch('http://localhost:5000/api/projects', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

### Update a project
```javascript
const formData = new FormData();
formData.append('service_id', '1');
formData.append('project_name', 'Updated Project Name');
formData.append('project_description', 'Updated description');
// Only include files if you want to replace them

fetch('http://localhost:5000/api/projects/15', {
    method: 'PUT',
    body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

## Notes

1. **File Management**: When updating projects, old files are automatically deleted if new files are uploaded.
2. **JSON Handling**: `project_photos` is stored as a JSON array in the database and automatically parsed when retrieved.
3. **Validation**: All required fields are validated before processing file uploads to prevent unnecessary file storage.
4. **Error Handling**: Comprehensive error handling with proper HTTP status codes and descriptive messages.
5. **Backward Compatibility**: Legacy endpoints are maintained for existing integrations.
6. **File Cleanup**: Failed operations automatically clean up any uploaded files to prevent orphaned files.
