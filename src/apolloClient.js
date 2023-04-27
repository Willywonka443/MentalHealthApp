import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: `https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clfvrboud4y2o01ui4s5e9h2v/master`,
  cache: new InMemoryCache()
});

function Client({data}) {
  return (
    <div>
      {data ? (
        <ul>
          {data.journals.map(journal => (
            <li key={journal.id}>
              <h2>{journal.entries}</h2>
              <p>{journal.entryDate}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Hello</p>
      )}
    </div>
  );
}

export default Client;