// Import utility functions
import { onError } from './app/utils/on-error.util';
import { normalizePort } from './app/utils/normalize-port.util';

// Load Node's App and DB environment variable configuration file
import { validateAppEnvVariables } from './app/config/env.config';
import { validateDBEnvVariables } from './database/config/env.config';

// Set up appropriate environment variables if necessary
validateAppEnvVariables();
validateDBEnvVariables();

// Module Dependencies
const serverConfig = require('./app/config/server.config');

// Load `Node` `http` module
const http = require('http');

// Set `PORT` based on environment and store in `Express`
const PORT = normalizePort(process.env.PORT) !== undefined ?
                      normalizePort(process.env.PORT) : 3000;
                      serverConfig.set('port', PORT);

// Create `http` server
let server = http.createServer(serverConfig);


// Listen on the provided `PORT`
server.listen(PORT, '0.0.0.0');

// Add `error` handler
server.on('error', onError);

// Initiate `listening` on `PORT`
server.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  if(process.env.NODE_ENV === 'development') {
    console.log(`Wizardry is afoot on ${bind}`);
  }
}
