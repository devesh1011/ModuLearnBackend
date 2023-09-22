const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRoutes');
const courseRouter = require('./routes/courseRoutes');
const { connectDB } = require('./db/connectDB')
dotenv.config('./env');

const app = express();

app.use(express.json());

app.use('/auth', authRouter); //user route
app.use('/course', courseRouter); // course route

app.get('/', (req, res) => {
    res.send('Hello World');
})

// 404 page
app.use((req, res) => {
    res.sendFile(__dirname + '/pages/404.html')
})

app.listen(process.env.PORT, () => {
    connectDB(process.env.DB_URI);
    console.log("Listening to PORT " + process.env.PORT);
})