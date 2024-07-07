// Import the router function provided by Express.js
const router = require('express').Router();

// Import the user CRUD functions in the controllers folder.  
const {
    createUser,
    getUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController.js');

// GET all users with this route: /api/users
router.route('/').get(getUsers).post(createUser);

// GET, PUT(update) AND DELETE a single user with this route: /api/users/:userId
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// POST and DELETE a friend for a user with this route: /api/users/:userId/friends/friendId
router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;