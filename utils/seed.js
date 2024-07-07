// Import our connection file to connect to our mongoose server.
const connection = require('../config/connection');

// Import the user model so we can seed some dummy data further down.
const { User } = require('../models');

// Error handling
connection.on('error', (err) => err);

// Creates a connection to mongodb
connection.once('open', async () => {
    // Delete the collections if they exist

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }


    // Create some user data to seed into the database 
    const users = [
        {
            username: "isaac",
            email: "isaac@isaac.com",
        },
        {
            username: "falcon",
            email: "falcon@falcon.com",
        },
    ];

    await User.insertMany(users);

    // Display our seeded data and let us know when the seeding is complete. Then exit the process. 
    console.table(users);
    console.timeEnd('seeding complete 🌱');
    process.exit(0);
});