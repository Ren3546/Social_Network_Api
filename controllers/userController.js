const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then(results => res.json(results))
      .catch(err => {
        if (err) throw err;
      });
  },

  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .lean()
      .then(results => {
        // Add friend count to the results object
        results.friendCount = results.friends.length;
        res.json(results);
      })
      .catch(err => {
        if (err) throw err;
      });
  },

  newUser(req, res) {
    User.create(req.body)
      .then(results => res.json(results))
      .catch(err => {
        if (err) throw err;
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(results => res.json(results))
      .catch(err => {
        if (err) throw err;
      });
  },

  deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.params.userId })
      .then(results => res.json(results))
      .catch(err => {
        if (err) throw err;
      });
  },

  addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(user);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
},

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user with that id' });
        }
        res.json(user);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};