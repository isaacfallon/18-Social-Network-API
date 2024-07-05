const connection = require('../config/connection');
const { User } = require('../models');

connection.on('error', (err) => err);

// Creates a connection to mongodb
connection.once('open', async () => {
    // Delete the collections if they exist
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

    console.table(users);
    console.timeEnd('seeding complete 🌱');
    process.exit(0);
});