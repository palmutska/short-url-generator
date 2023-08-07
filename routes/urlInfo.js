const express = require('express');
const { getUrlInfo } = require("../controllers/urlInfoController")

const router = express.Router();

router.get('/links/:key', getUrlInfo);

module.exports = router;