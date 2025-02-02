import { Amplify } from 'aws-amplify';

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://6lga4ennnfbrbjemnpfot6f4py.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-6gli56bkfvcuffyx73uu6vhzwi'
    }
  }
});

// Verificación de configuración
console.log('AWS Amplify configurado:', Amplify.getConfig());