const router = require('express').Router();
//linking to controllers
const {
    getThoughts,
    getOneThought,
    newThought,
    deleteThought,
    createReaction, 
    deleteReaction,
  } = require('../../controllers/thoughtController');
  
  // /api/thought
  //get all thoughts and post new thought
  router.route('/').get(getThoughts).post(newThought);
  
  // /api/thought/:thoughtId
  //get one thought, delete thought
  router.route('/:thoughtId').get(getOneThought).delete(deleteThought);

  // /api/thought/:thoughtId/reactions
  //post a reaction to a thought
  router.route('/:thoughtId/reactions').post(createReaction);

  // /api/thought/:thoughtId/reactions/:reactionId
  //delete reaction
  router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
