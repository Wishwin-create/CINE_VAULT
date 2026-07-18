import Media from '../models/Media.js';

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

