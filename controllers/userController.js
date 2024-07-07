// Import the User and Thought models
const { User, Thought } = require('../models');

// Export the following functions to be used in the routes folder
module.exports = {
  // Get all users using User.find() and display JSON user data.
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    // Get a single user using User.findOne() and display the JSON user data.

    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a user using User.create and display the new JSON user data.
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  },

  // Update a user using User.findOneAndUpdate and display the updated JSON thought data.
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId },
        {
          "$set":
            { username: req.body.username, email: req.body.email }
        },
        { new: true, upsert: true },
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log('Something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  },

  // Delete a user using User.findOneAndDelete and the user's thoughts using Thought.deleteMany.
  // Then display a JSON message to indicate this.
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } }); // Also deletes thoughts associated with the user on user deletion
      res.json({ message: 'User and associated thoughts deleted.' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend for a user using User.findOneAndUpdate and the $addToSet MongoDB operator
  // then display the updated JSON user data.
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.userId } },
        // { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      // Here we fetch the updated user using the await keyword in our asynchronous function
      // so we can display the updated JSON user data. 
      const updatedUser = await User.findById(req.params.userId);
      res.status(200).json(updatedUser);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a friend for a user using User.findOneAndUpdate and the $pull MongoDB operator
  // then display the updated JSON user data.
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.userId } },
        // { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      // Fetch the updated user's information after deleting a friend
      const updatedUser = await User.findById(req.params.userId);
      res.status(200).json(updatedUser);

    } catch (err) {
      res.status(500).json(err);
    }
  },
};
