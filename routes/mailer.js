var express = require('express');
var router = express.Router();
var mailerController = require('../controllers/mailerController');

router.get('/send', mailerController.sendmail);

router.get('/verify', mailerController.displayFormAuth);

router.post('/verify', mailerController.checkFormAuth);

router.get('/forgetpass',mailerController.displayFormInputEmail);

router.post('/forgetpass',mailerController.checkEmail);

router.get('/changepassword',mailerController.displayFormChangePassword);
router.post('/changepassword',mailerController.changePassword);

// router.get('/verify', function (req, res) {
//     console.log(req.protocol + ":/" + req.get('Host'));
//     if ((req.protocol + "://" + req.get('Host')) == ("http://" + Host)) {
//         console.log("Domain is matched. Information is from Authentic email");
//         if (req.query.id == Rand) {
//             console.log("email is verified");
//             res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
//         }
//         else {
//             console.log("email is not verified");
//             res.end("<h1>Bad Request</h1>");
//         }
//     }
//     else {
//         res.end("<h1>Request is from unknown source");
//     }
// });


module.exports = router;