import { Amplify } from 'aws-amplify';

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://cdmhpg4fabcqfhbezs6jywe67u.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-fhu25b6h3fbwtmxxiokrzshoee'
    }
  }
});