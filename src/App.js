import React, { Component } from 'react';
import './App.css';
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from "react-apollo";
import Utente from './components/spotify';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

const authAfterware = new onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors){
      if (err.message === 'Unauthorized') {
        window.open('http://10.50.65.15:4000/auth/connect', '_self', false)
      }
    }
  }
})

const link = new createHttpLink({ uri: 'http://10.50.65.15:4000/graphql', credentials: 'include' })

const client = new ApolloClient({
  link: authAfterware.concat(link),
  cache: new InMemoryCache()
});




class App extends Component {
  render() {
    return (
     <ApolloProvider client={client}>
     <div className="App">
     <header className='App-header'>
     
      
      <Utente></Utente>

     </header>
     </div>
     </ApolloProvider>
    );
  }
}

export default App;
