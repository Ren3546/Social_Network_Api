const { Schema, model } = require('mongoose');

//schema for users
const UserSchema = new Schema(
    {
        username: {
            type: String, 
            unique: true,
            required: true, 
            trim: true,
        },
        email: {
            type: String, 
            unique: true,
            required: true, 
            match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address']
        },
        thoughts: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
          },
        ],
        friends: [
          {
            type:Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id:false,
    },
)

//adds friend count to user
UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;