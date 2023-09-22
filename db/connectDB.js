const mongoose = require('mongoose');

// Connecting to database
const connectDB = async (DB_URI) => {
    try {
        const conn = await mongoose.connect(DB_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {
    connectDB
}