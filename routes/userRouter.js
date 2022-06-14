const Router = require('express');

const router = new Router();
const userController = require('../controllers/userController');
const checkRole = require('../middleware/checkRole');

router.get('/login', userController.login);
router.post('/login', userController.auth);

router.get('/userList', checkRole('ADMIN'), userController.getUserList);
router.post('/userList', checkRole('ADMIN'), userController.postUserList);

router.get('/addUser', checkRole('ADMIN'), userController.getAddUser);
router.post('/addUser', checkRole('ADMIN'), userController.postAddUser);

router.get('/user', checkRole('ADMIN'), userController.getUser);
router.post('/user', checkRole('ADMIN'), userController.postUser);

router.get('/exit', userController.exit);

module.exports = router;
