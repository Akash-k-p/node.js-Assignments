const Url = require('../models/urlModel');
const logger = require("./../utils/logger")
const ApiError = require("../utils/ApiError")
// Add new short URL
exports.createShortUrl = async (req, res) => {
    try {
    const { originalUrl } = req.body;
    const url = new Url({ originalUrl });
    await url.save();
    logger.log("info","Successfully created short URL")
    res.json({ id: url._id, shortUrl: url.shortUrl });
    }
    catch (error) {
        logger.log("error","Failed to create short URL")
        res.status(500).json({ error: error.message });
    }
};

// Get URL details by ID
exports.getUrlDetails = async (req, res,next) => {
    try {
        const url = await Url.findOne({ _id: req.params.id });
        if (!url) return res.status(404).json({ message: 'URL not found' });
        logger.log("info","Successfully fetched URL details")
        res.json({ id: url._id, originalUrl: url.originalUrl, shortUrl: url.shortUrl});

    } catch (error) {
        logger.log("error",`Failed to fetch URL details error:${error.message}`); 
        next(new ApiError(500,`${req.params.id} is not found`))
    }
};
// Get all URLs
exports.getAllUrls = async (req, res) => {
    try {

        const urls = await Url.find();
        logger.log("info","Successfully fetched all URL details")
        res.json(urls);
       
    } catch (error) {
        logger.log("error",`Failed to fetch all URL details error:${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Update URL by ID
exports.updateUrl = async (req, res,next) => {
    const { originalUrl } = req.body;
    try {
        const url = await Url.findOneAndUpdate(
            { _id: req.params.id },
            { originalUrl },
            { new: true }
        );
        if (!url) return res.status(404).json({ message: 'URL not found' });
        logger.log("info","Successfully updated URL")
        res.json({ message: 'URL updated', url });

    } catch (error) {
        logger.log("error",`Failed to update URL error:${error.message}`);
       next(new ApiError(500,`${req.params.id} is not found`))
    }
};

// Delete URL by ID
exports.deleteUrl = async (req, res) => {
    try {
        const url = await Url.findOneAndDelete({ _id: req.params.id });
        if (!url) return res.status(404).json({ message: 'URL not found' });
        logger.log("info","Successfully deleted URL")
        res.json({ message: 'URL deleted' });
    } catch (error) {
        logger.log("error",`Failed to delete URL error:${error.message}`);
        next(new ApiError(500,`${req.params.id} is not found`))
    }
};