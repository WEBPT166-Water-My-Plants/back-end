const router = require('express').Router();

const UserRouter = require('../auth/users/user-router');
const AuthRouter = require('../auth/auth-router');
const Restricted = require('../auth/restricted-middleware');
const PlantsRouter = require('../auth/plants/plants-router');

router.use('/users', Restricted, UserRouter);
router.use('/auth', AuthRouter);
router.use('/plants', Restricted, PlantsRouter);

module.exports = router;
