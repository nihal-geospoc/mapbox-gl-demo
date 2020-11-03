
let config = require('../../config');

// Check each necessary node `environment variable` to see if a
// value has been set and if not, use the `config` object to
// supply appropriate values
export function validateDBEnvVariables() {

  // Set the appropriate Database URI
  validateDatabaseUri();

  return;
}


// Set the appropriate Database URI with the `config` object
// based on the value in `process.env.NODE_ENV
function validateDatabaseUri() {

  if (!process.env.DATABASE_URI) {

    console.log('No value set for DATABASE_URI...');
    console.log('Using the supplied value from config object...')

    switch(process.env.NODE_ENV) {

      case 'development':

        process.env.DATABASE_URI = config.DATABASE_URI.DEVELOPMENT;
        console.log(`DATABASE_URI set for ${process.env.NODE_ENV}`);
        break;

      case 'production':

        process.env.DATABASE_URI = config.DATABASE_URI.PRODUCTION;
        console.log(`DATABASE_URI set for ${process.env.NODE_ENV}`);
        break;

      default:

        console.log('Unexpected behavior! process.env.NODE_ENV set to ' +
          'unexpected value!');
        break;
    }
  }

  return;
}
