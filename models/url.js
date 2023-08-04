/**
 * Importing the mongoose library which provides a straightforward, schema-based solution
 * to model application data. It includes built-in type casting, validation, query building, 
 * business logic hooks and more, out of the box.
 */
const mongoose = require("mongoose");

/**
 * Creating a new mongoose schema to model the data for a URL.
 * This Schema is for an entity named 'Url'.
 */
const UrlSchema = new mongoose.Schema({
    /**
     * oldUrl: This field stores the original URL which is to be shortened.
     * It's a mandatory field represented as a String.
     */
    oldUrl: {
        type: String,
        required: true,
    },
    /**
     * shortUrl: This field stores the shortened version of the original URL.
     * It's a mandatory field represented as a String.
     * It has a 'unique' property which ensures that no two documents will have 
     * the same value for this field.
     */
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    /**
     * clickCount: This field stores the number of times the shortened URL has been clicked.
     * It's represented as a Number.
     * By default, it's set to 0.
     */
    clickCount: {
        type: Number,
        default: 0
    },
    /**
     * createdAt: This field stores the date and time at which the document is created.
     * It's represented as a Date.
     * By default, it's set to the current date and time.
     */
    createdAt: {
        type: Date,
        default: Date.now
    },  
});

/**
 * Creating a mongoose model from the UrlSchema.
 * The model represents a collection of documents in the MongoDB database 
 * that you can search in.
 * Here, 'Url' is the name of the model.
 */
const Url = mongoose.model('Url', UrlSchema);

/**
 * Exporting the Url model to be available for other modules to require.
 */
module.exports = Url;
