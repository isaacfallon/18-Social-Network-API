// Import the connect and connection properties from the mongoose module
const { connect, connection } = require('mongoose');

// Connect to MongoDB using our local machine's IP address and default Mongoose port number using the database name 'socialMediaAPI'.
connect('mongodb://127.0.0.1:27017/socialMediaAPI');

module.exports = connection;