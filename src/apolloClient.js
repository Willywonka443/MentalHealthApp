
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clh46qagr5b3901umbqn54cux/master',
  cache: new InMemoryCache(),
});

export default client;

