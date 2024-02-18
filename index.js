const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://nanamiwaku:PkkJdfZQiBTPejEu@cluster0.bzf8vmp.mongodb.net/comp3133_assigment1', {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      if (token) {
        try {
          const decoded = jwt.verify(token, 'your_secret_key');
          return { userId: decoded.userId };
        } catch (err) {
          throw new Error('Session invalid or expired');
        }
      }
    },
  });
  await server.start();
  server.applyMiddleware({ app });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers);
