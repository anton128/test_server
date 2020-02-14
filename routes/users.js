var express = require('express');
var router = express.Router();
// var User = require('./../model/user');
var Mail = require('./../model/mail');
const sgMail = require('@sendgrid/mail');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   User.find({}, function(err, users) {
//     if (err)
//       return res.status(500).json({ message: 'Get User Error', error: err });

//     // object of all the users
//     res.status(200).json({ users });
//   });
// });

// router.post('/add', function(req, res, next) {
//   console.log(req.body.name, req.body.email);
//   var newUser = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   });
//   newUser.save(function(err) {
//     if (err) {
//       return res.status(500).json({ message: 'Add User Error', error: err });
//     }

//     res.status(200).json({ message: 'User saved successfully!' });
//   });
// });

router.post('/', function(req, res, next) {
  var newEmail = new Mail({
    name: req.body.name,
    to: req.body.to,
    from: req.body.from,
    subject: req.body.subject,
    text: req.body.text
  });
  newEmail.save(function(err) {
    if (err) {
      return res.status(500).json({message: 'Save email', error: err});
    }

    // sgMail.setApiKey('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');
    // const msg = {
    //   to: req.body.to,
    //   from: req.body.from,
    //   subject: req.body.subject,
    //   text: req.body.text
    // };
    // console.log(msg);
    // sgMail.send(msg);
    res.status(200).json({message: 'email saved successfully!'})
  })
})

module.exports = router;
