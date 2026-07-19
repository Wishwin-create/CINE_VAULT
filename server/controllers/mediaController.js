import Media from '../models/Media.js';
import fs from 'fs';

//GET /api/media?type=movie|tv
export const getMedia = async (req, res) => {
    try{
        const { type } = req.query;
        const filter = type ? { type } : {};
        const media = await Media.find(filter).sort({ createdAt: -1 });
        res.json(media);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch media' });
    }

};

//GET /api/media/featured
export const getFeatured = async (req, res) => {
    try {
        const featured = await Media.find({ featured: true });
        res.json(featured);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch featured media' });
    }

    };

// GET /api/media/:id

export const getMediaById = async (req, res) => {
    try{
        const media = await Media.findById(req.params.id);
        if(!media) return res.status(404).json({ message: 'Media not found' });
        res.json(media);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch media' });
    }
};

export const streamMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media?.filePath) {
            return res.status(404).json({ error: 'No video file linked to this title'  });

        }

        const filePath = media.filePath;
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Video file not found on disk' });
        }

        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;    

        if (range) {
            const [starStr, endStr] = range.replace(/bytes=/, "").split("-");
            const start = parseInt(starStr, 10);
            const end = endStr ? parseInt(endStr, 10) : fileSize - 1;
            const chunkSize = (end - start) + 1;

            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            });
            fs.createReadStream(filePath, { start, end }).pipe(res);
        } else {
            res.writeHead(200, {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            });
            fs.createReadStream(filePath).pipe(res);
        }
    } catch (err) {
        console.error('Streaming error:',err);
        res.status(500).json({ error: 'Failed to stream media' });
    }
};