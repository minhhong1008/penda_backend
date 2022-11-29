import express from 'express';
const router = express.Router();

import { signup, signin, signout } from '../controllers/auth';
import { userSignupValidator } from '../validator/index';


// Authorziation: `Bearer ${token}`



router.post('/signup', userSignupValidator , signup);
router.post('/signin', signin)
router.get('/signout', signout);
// router.get('/disconnect', signout);



module.exports = router;



