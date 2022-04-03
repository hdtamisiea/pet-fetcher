const router = require('express').Router();
const { Pet } = require('../../models');
var convertapi = require('convertapi')(process.env.API_SECRET);
require('dotenv').config();

router.post('/', (req, res) => {
    convertapi.convert('svg', { File: path }, 'jpg')
  .then(function(result) {
    // get converted file url
    console.log("Converted file url: " + result.file.url);

    // save to file
    return result.file.save(`./public/img/${name}.svg`);
  })
  .then(function(file) {
    console.log("File saved: " + file);
    // imgConvert = res.send(file);
    Pet.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['pic_filename']
    })
    .then(convertImg => {
        if (!convertImg) {
            res.status(404).json({ message: 'No pet found with that id' });
            return;
        }
        res.send(convertImg);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
  })
  .catch(function(e) {
    console.error(e.toString());
  });
});

module.exports = router;
