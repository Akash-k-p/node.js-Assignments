const Url = require('../models/urlModel');

// Add new short URL
exports.createShortUrl = async (req, res) => {
    try {
    const { originalUrl } = req.body;
    const url = new Url({ originalUrl });
    await url.save();
    res.json({ id: url._id, shortUrl: url.shortUrl });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get URL details by ID
exports.getUrlDetails = async (req, res) => {
    try {
        const url = await Url.findOne({ _id: req.params.id });
        if (!url) return res.status(404).json({ message: 'URL not found' });
        res.json({ id: url._id, originalUrl: url.originalUrl, shortUrl: url.shortUrl});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get all URLs
exports.getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find();
        res.json(urls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update URL by ID
exports.updateUrl = async (req, res) => {
    const { originalUrl } = req.body;
    try {
        const url = await Url.findOneAndUpdate(
            { _id: req.params.id },
            { originalUrl },
            { new: true }
        );
        if (!url) return res.status(404).json({ message: 'URL not found' });
        res.json({ message: 'URL updated', url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete URL by ID
exports.deleteUrl = async (req, res) => {
    try {
        const url = await Url.findOneAndDelete({ _id: req.params.id });
        if (!url) return res.status(404).json({ message: 'URL not found' });
        res.json({ message: 'URL deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};