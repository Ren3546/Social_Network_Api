const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    newThought,
    deleteThought,
    createReaction, 
    deleteReaction,
  } = require('../../controllers/thoughtController');
  
  // /api/thoughts
  router.route('/').get(getThoughts).post(newThought);
  
  // /api/thoughts/:thoughtId
  router.route('/:thoughtId').get(getOneThought).delete(deleteThought);

  // /api/thoughts/:thoughtId/reactions
  router.route('/:thoughtId/reactions').post(createReaction);

  // /api/thoughts/:thoughtId/reactions/:reactionId
  router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
