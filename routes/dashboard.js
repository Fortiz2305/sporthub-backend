'use strict';
const express = require('express');

const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    success: true,
    message: "You're authorized to see this message."
  });
});

module.exports = router;
