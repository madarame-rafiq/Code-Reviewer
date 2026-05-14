const { Router } = require("express");
const getReview = require('../controllers/ai.controllers');

const router = Router();

router.post('/get-review', getReview);

module.exports = router