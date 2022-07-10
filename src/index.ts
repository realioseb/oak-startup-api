import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { typeDefs, resolvers } from './gql';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`Server started: ${url}`);
});
