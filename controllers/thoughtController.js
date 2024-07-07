// Import the Thought and User models
const { Thought, User } = require('../models');

// Export the following functions to be used in the routes folder
module.exports = {

    // Get all thoughts using Thought.find() and display JSON thought data.
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought using Thought.findOne() and display the JSON thought data.
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a thought using Thought.create and display the new JSON thought data.
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                })
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    
    // Update a thought using Thought.findOneAndUpdate and display the updated JSON thought data.
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
                {
                    "$set":
                        { thoughtText: req.body.thoughtText }
                },
                { new: true, upsert: true },
            );
            res.status(200).json(updatedThought);
        } catch (err) {
            console.log('Something went wrong');
            res.status(500).json({ message: 'something went wrong' });
        }
    },

    // Delete a thought using Thought.findOneAndDelete and display a JSON message to indicate this.
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a reaction to a thought using Thought.findOneAndUpdate and the $addToSet MongoDB operator
    // then display the updated JSON thought data.
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                // { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            // Here we fetch the updated thought using the await keyword in our asynchronous function
            // so we can display the updated JSON thought data.
            const updatedThought = await Thought.findById(req.params.thoughtId);
            res.status(200).json(updatedThought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a reaction to a thought using Thought.findOneAndUpdate and the $pull MongoDB operator
    // then display the updated JSON thought data.
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                // { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            const updatedThought = await Thought.findById(req.params.thoughtId);
            res.status(200).json(updatedThought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
};
