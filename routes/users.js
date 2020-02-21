var express = require('express');
var router = express.Router();
var resumedata = require('../resumeData');

router.get('/:name', function(req, res, next) {
  if (Object.keys(resumedata).indexOf(req.params.name) > -1) {
    res.status(200).json(resumedata[req.params.name]);
  } else {
    res.status(500).send("no data");
  }
})

module.exports = router;
