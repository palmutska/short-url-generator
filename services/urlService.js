/**
 * Importing the Url model which represents a MongoDB collection and defines a shape of the documents within that collection.
 */
const Url = require("../models/url");

/**
 * Importing the database service that provides functionality to connect and interact with the MongoDB database.
 */
const db = require("../services/db.js");

/**
 * UrlService class defines methods related to URL operations in the database.
 */
class UrlService {
  /**
   * Adds a new URL to the database.
   * @param {string} oldUrl - The original URL.
   * @param {string} shortUrl - The shortened version of the original URL.
   * @returns {Promise<string>} The shortened URL stored in the database.
   * @throws {Error} If oldUrl or shortUrl is not provided.
   * @throws {Error} If there is any error in execution.
   */
  static async addUrl(oldUrl, shortUrl) {
    if (!oldUrl || !shortUrl) {
      throw new Error("Missing parameters");
    }
    try {
      const filter = { shortUrl };

      const existingUrl = await Url.findOne(filter).exec();
      if (existingUrl) {
        return existingUrl.shortUrl;
      }

      const shortUrlDoc = new Url({
        oldUrl,
        shortUrl,
      });

      await shortUrlDoc.save();

      return shortUrlDoc.shortUrl;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Retrieves the original URL based on the shortened URL from the database.
   * @param {string} shortUrl - The shortened URL.
   * @returns {Promise<string|null>} The original URL if it exists; null otherwise.
   * @throws {Error} If shortUrl is not provided.
   * @throws {Error} If there is any error in execution.
   */
  static async getOldUrlByShortUrl(shortUrl) {
    if (!shortUrl) throw new Error("Missing parameter");
    try {
      const filter = { shortUrl };
      const url = await Url.findOne(filter).exec();

      if (url) {
        return url.oldUrl;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Increments the click count of a URL based on the shortened URL in the database.
   * @param {string} shortUrl - The shortened URL.
   * @throws {Error} If shortUrl is not provided.
   * @throws {Error} If the URL does not exist.
   * @throws {Error} If there is any error in execution.
   */
  static async addClick(shortUrl) {
    if (!shortUrl) throw new Error("Missing parameter");
    try {
      const filter = { shortUrl };
      const update = { $inc: { clickCount: 1 } };

      const url = await Url.findOneAndUpdate(filter, update, {
        new: true,
      }).exec();

      if (!url) {
        throw new Error("URL not found");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * Retrieves the details of a URL associated with the provided short URL from the database.
   * @param {string} shortUrl - The shortened URL.
   * @returns {Promise<object|null>} A promise that resolves to an object containing the URL details if it exists; null otherwise.
   * @throws {Error} If shortUrl is not provided.
   * @throws {Error} If there is any error in execution.
   */
  static async getUrlDetails(shortUrl) {
    if (!shortUrl) throw new Error("Missing parameter");
    try {
      const filter = { shortUrl };
      const url = await Url.findOne(filter).exec();

      if (url) {
        return {
          oldUrl: url.oldUrl,
          shortUrl: url.shortUrl,
          clickCount: url.clickCount,
          createdAt: url.createdAt,
        };
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

/**
 * Exporting the UrlService class to be available for other modules to require.
 */
module.exports = UrlService;
