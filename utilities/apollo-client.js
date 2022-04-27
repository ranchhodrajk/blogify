import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import {getCookie} from '../utilities/cookies'
// const link = createHttpLink({
//     uri: 'https://powerful-reef-94594.herokuapp.com/',
//     credentials: 'same-origin'
//   });

  const httpLink = createHttpLink({
    uri: 'https://powerful-reef-94594.herokuapp.com/',
  });
  

  const authLink = setContext((_, { headers }) => {
    const token=getCookie("token");
    
    console.log('client file token',token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  
  export default client;
  
  // "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTUzNTEwY2MzMjViMjAyNDIyMzczNyIsImVtYWlsIjoiYWJjQGFiYy5jb20iLCJ1c2VybmFtZSI6IlRlc3QiLCJpYXQiOjE2NTA0Mjk3NTcsImV4cCI6MTY1MDQzMzM1N30.YwjTX4Vp3aYXrQQr7h4ueLJiGlmjgLzTaJSW-C9SVJk"