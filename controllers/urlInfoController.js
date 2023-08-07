/**
 * Module for handling the retrieval of URL information based on the short URL key.
 * @module UrlInfoController
 */

const urlService = require("../services/urlService");

/**
 * Retrieves and sends the URL information associated with the provided short URL key as a JSON response.
 * @async
 * @param {Object} req - The request object containing the URL key as a parameter.
 * @param {Object} res - The response object to send the URL information or error response.
 */

const getUrlInfo = async (req, res) => {
    try {
        // Build the short URL from the request's host and the URL key parameter
        const shortUrl = "https://" + req.get("host") + "/" + req.params.key;

        // Retrieve URL details from database using UrlService
        const url = await urlService.getUrlDetails(shortUrl);

        // Check if URL exists
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Return URL details as JSON
        return res.json({
            oldUrl: url.oldUrl,
            shortUrl: url.shortUrl,
            clickCount: url.clickCount,
            createdAt: url.createdAt,
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
};

module.exports = {
  getUrlInfo,
};
