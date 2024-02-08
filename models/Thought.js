
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

//thoughts schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return new Date(timestamp).toLocaleString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      type: [reactionSchema],
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true, 
    },
    id: false,
  }
);

//adds friend count virtual to thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;