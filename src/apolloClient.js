import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';


export const client = new ApolloClient({
  uri: `https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clfvrboud4y2o01ui4s5e9h2v/master`,
  cache: new InMemoryCache()
});

function Client({data}) {
  return (
    <div>
      <ul>
      {data.journals && data.journals.map(journal => (
        <li key={journal.entry}>
          <h2>{journal.entry}</h2>
          <p>{journal.entryDate}</p>
          <p>{journal.login && journal.login.username}</p>
        </li>
      ))}
    </ul>
    <ul>
      {data.logins && data.logins.map(login => (
        <li key={login.username}>
          <p>{login.username}</p>
          <p>{login.password}</p>
        </li>
      ))}
    </ul>
  </div>
);
}

export default Client;


