
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://nanamiwaku:PkkJdfZQiBTPejEu@cluster0.bzf8vmp.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
