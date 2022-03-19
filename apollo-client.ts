import { ApolloClient, InMemoryCache } from "@apollo/client";
import Config from './config'

// uri: 'http://localhost:3000/dev/graphql',
//console.log(Config.APOLLO_SV_URI);

const client = new ApolloClient({
    uri : Config.APOLLO_SV_URI,
    cache: new InMemoryCache(),
});

export default client;
