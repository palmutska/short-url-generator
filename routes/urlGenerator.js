const express = require('express');
const { getSubmitUrl, postSubmitUrl } = require("../controllers/urlGeneratorController")

const router = express.Router();

router.get('/', getSubmitUrl);
router.post('/', postSubmitUrl);

module.exports = router;
