import { typeDefs } from '../../../graphql/schema';
import { resolvers } from '../../../graphql/graphql/resolvers';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export const GET = handler;
export const POST = handler;
