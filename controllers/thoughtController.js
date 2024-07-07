const { Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought
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
    // Create a new thought
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
    // Update a thought
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
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            // const user = await User.findOneAndUpdate(
            //     { thoughts: req.params.thoughtId },
            //     { $pull: { thoughts: req.params.thoughtId } },
            //     { new: true }
            // );

            // if (!user) {
            //     return res.status(404).json({
            //         message: 'Thought deleted but no user with this id!',
            //     });
            // }

            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add a reaction to a thought
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

            // Fetch the updated thought after adding the reaction
            const updatedThought = await Thought.findById(req.params.thoughtId);
            res.status(200).json(updatedThought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a reaction from a thought
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

            // Fetch the updated thought after removing the reaction
            const updatedThought = await Thought.findById(req.params.thoughtId);
            res.status(200).json(updatedThought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
};
