/**
 * Module for generating and handling short URLs.
 * @module ShortUrlGenerator
 */

const crypto = require("crypto");
const urlService = require("../services/urlService");
const url = require("url");

/**
 * Generates a short URL key from the given URL using SHA-256 hashing.
 * @param {string} url - The original URL to be shortened.
 * @returns {string} - The short URL key.
 */
const generateShortUrl = (url) => {
  const hash = crypto.createHash("sha256").update(url).digest("hex");
  return hash.substring(0, 6);
};

/**
 * Validates if the provided URL has a valid format.
 * @param {string} url - The URL to be validated.
 * @returns {boolean} - True if the URL is valid, otherwise false.
 */
function isValidURL(url) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return urlPattern.test(url);
}

/**
 * Renders the submission form for generating short URLs.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSubmitUrl = (req, res) => {
  res.render("index", {});
};

/**
 * Handles the submission of a URL for shortening.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const postSubmitUrl = async (req, res) => {
  try {
    if (!req.body.url) {
      return res.status(400).json({ error: "Missing URL parameter" });
    }

    if (!isValidURL(req.body.url)) {
      return res.status(400).json({ error: "URL is not valid" });
    }

    const parsedUrl = new URL(req.body.url);
    const protocol = parsedUrl.protocol;

    const key = generateShortUrl(req.body.url);
    const newUrl = protocol + "//" + req.get("host") + "/" + key;

    await urlService.addUrl(req.body.url, newUrl);

    res
      .status(200)
      .json({ shortUrl: newUrl, message: "URL generated successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to generate URL", details: err.message });
  }
};

// Exporting functions for use in other modules
module.exports = {
  getSubmitUrl,
  postSubmitUrl,
};
