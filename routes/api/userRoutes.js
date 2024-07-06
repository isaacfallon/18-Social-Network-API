const router = require('express').Router();
const {
    createUser,
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/:userId').put(updateUser);

router.route('/:userId').delete(deleteUser);

module.exports = router;
