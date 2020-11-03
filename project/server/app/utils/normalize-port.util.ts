/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(input: any) {
    let port = parseInt(input, 10);
  
    if (isNaN(port)) {
      // named pipe
      return input;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  