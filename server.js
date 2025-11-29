import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for the Vite dev server
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(express.json());

// Serve static files from the React app build directory
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    console.log(`📂 Serving static files from: ${distPath}`);
}

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp|svg/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Upload endpoint
app.post('/api/upload-image', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { filename } = req.body;

        if (!filename) {
            return res.status(400).json({ error: 'Filename is required' });
        }

        // Validate filename to prevent directory traversal
        const safeName = path.basename(filename);
        const assetsPath = path.join(__dirname, 'src', 'assets', safeName);

        // Write the file
        fs.writeFileSync(assetsPath, req.file.buffer);

        console.log(`✅ Image uploaded successfully: ${safeName}`);

        res.json({
            success: true,
            message: 'Image uploaded successfully',
            filename: safeName,
            path: `/src/assets/${safeName}`
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            error: 'Failed to upload image',
            details: error.message
        });
    }
});

// Save content endpoint
app.post('/api/save-content', (req, res) => {
    try {
        const content = req.body;

        if (!content) {
            return res.status(400).json({ error: 'No content provided' });
        }

        const contentPath = path.join(__dirname, 'public', 'content.json');

        // Write the file
        fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));

        console.log('✅ Content saved successfully to public/content.json');

        res.json({
            success: true,
            message: 'Content saved successfully'
        });

    } catch (error) {
        console.error('Save error:', error);
        res.status(500).json({
            error: 'Failed to save content',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Upload server is running' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    const indexFile = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
    } else {
        res.status(404).send('App not built. Run "npm run build" first.');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Upload server running on http://localhost:${PORT}`);
    console.log(`📁 Serving uploads to: ${path.join(__dirname, 'src', 'assets')}`);
});
