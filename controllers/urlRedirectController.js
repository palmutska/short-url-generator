/**
 * Module for handling URL redirection based on the short URL key.
 * @module UrlRedirectController
 */

const urlService = require("../services/urlService");

/**
 * Redirects the user to the original URL associated with the provided short URL key.
 * @async
 * @param {Object} req - The request object containing the URL key as a parameter.
 * @param {Object} res - The response object to send the redirection or error response.
 */
const getUrlRedirect = async (req, res) => {
  try {
    // Build the short URL from the request's host and the URL key parameter
    const shortUrl = "https://" + req.get("host") + "/" + req.params.key;

    // Retrieve the original URL associated with the short URL key
    const urlToRedirect = await urlService.getOldUrlByShortUrl(shortUrl);

    // If no original URL is found, render a 404 page
    if (!urlToRedirect) {
      return res.render("404", {});
    }

    // Redirect the user to the original URL
    res.redirect(urlToRedirect);
  } catch (err) {
    console.error(err);
    // Send a 500 error response with the error details
    res.status(500).json({ error: err });
  }
};

// Exporting the function for use in other modules
module.exports = {
  getUrlRedirect,
};
