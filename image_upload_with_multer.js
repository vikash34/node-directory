
var storage2 = multer.diskStorage({

  //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './static/credit_debit_notes/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, datetimestamp + '_' + file.originalname);
  }
});



var upload2 = multer({ //multer settings
  storage: storage2
}).single('file');


export function upload2(req, res) {
  return upload2(req, res, function (err) {
      if (err) {
          res.json({error_code: 1, err_desc: err});
          return;
      }
      res.json({error_code: 0, err_desc: null, file: req.file.filename});
  })
}
