// Import the router function provided by Express.js
const router = require('express').Router();

// Import the thought CRUD functions in the controllers folder.  
const {
  createThought,
  getThoughts,
  getSingleThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// GET all thoughts with this route: /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// GET, PUT(update) AND DELETE a single thought with this route: /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// POST a reaction to a single thought with this route: /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE a reaction from a single thought with this route: /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;