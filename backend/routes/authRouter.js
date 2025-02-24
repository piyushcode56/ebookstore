const express = require('express');
const app = express();
const router = express.Router();
const authController = require('../controllers/authController')
const {signupValidation, loginValidation} = require('../middlewares/authValidation');


router.get('/', authController.getHomePage);
router.post('/signup', signupValidation, authController.signup);
router.post('/login', loginValidation, authController.login);

module.exports = router;