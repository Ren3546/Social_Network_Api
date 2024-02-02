
const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
  Thought.find()
    .then(thoughts => {
      res.status(200).json(thoughts);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to get thoughts' });
    });
},

getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .lean()
      .then(thought => {
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that id' });
        }
        thought.reactionCount = thought.reactions.length; // Access the reactions array length
        delete thought.reactions;
        res.json(thought);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

newThought(req, res) {
  Thought.create(req.body)
    .then(thought => {
      res.json(thought);
    })
    .catch(err => {
      res.status(500).json(err);
    });
},

deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then(thought => {
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that id' });
      }
      res.json(thought);
    })
    .catch(err => {
      res.status(500).json(err);
    });
},

createReaction(req, res) {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  Thought.findOneAndUpdate(
    { _id: thoughtId },
    { $push: { reactions: { reactionBody, username } } },
    { new: true }
  )
    .then(updatedThought => {
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that id' });
      }
      res.json(updatedThought);
    })
    .catch(err => {
      res.status(500).json(err);
    });
},

deleteReaction(req, res) {
  const { thoughtId, reactionId } = req.params;

  Thought.findOneAndUpdate(
    { _id: thoughtId },
    { $pull: { reactions: { _id: reactionId } } },
    { new: true }
  )
    .then(updatedThought => {
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that id' });
      }
      res.json(updatedThought);
    })
    .catch(err => {
      res.status(500).json(err);
    });
},
}