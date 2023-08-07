const express = require('express');
const { getUrlRedirect } = require("../controllers/urlRedirectController");

const router = express.Router();

router.get('/:key', getUrlRedirect);

module.exports = router;
