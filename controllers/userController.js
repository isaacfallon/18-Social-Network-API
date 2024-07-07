const { User, Thought } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
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
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } }); // Also deletes thoughts associated with the user on user deletion (NEED TO TEST)
      res.json({ message: 'User and associated thoughts deleted.' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
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

      // Fetch the updated user's information after adding a friend
      const updatedUser = await User.findById(req.params.userId);
      res.status(200).json(updatedUser);

    } catch (err) {
      res.status(500).json(err);
    }
  },
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
