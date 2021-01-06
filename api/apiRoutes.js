const router = require('express').Router();

const UserRouter = require('../auth/users/user-router');
const AuthRouter = require('../auth/auth-router');
const Restricted = require('../auth/restricted-middleware');

router.use('/users', Restricted, UserRouter);
router.use('/auth', AuthRouter);

module.exports = router;
