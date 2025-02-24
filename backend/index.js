const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./models/db');
const User = require('./models/User');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const authRoutes = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');
const bookRouter = require('./routes/bookRouter');

app.use('/', authRoutes);
app.use('/products', productRouter);
app.use('/books', bookRouter);
app.use('/uploads', express.static('uploads'));

// app.post('/register', (req, res) => {

// })


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

