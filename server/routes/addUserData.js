var express = require('express');
var router = express.Router();

/* GET users listing. */

router.post('/addUserData', function(req, res, next) {
  let sampleFiles;
  console.log('request', req);
  if(!req.files || Object.keys(req.files).length === 0){
    return res.status(400).send('No files found')
  }
  sampleFiles = req.files;
  console.log('sampleFiles', sampleFiles);
});

module.exports = router;
