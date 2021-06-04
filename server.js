const http = require('http');
const fileSystem = require('fs');
const PORT = process.env.PORT || 5098;

http.createServer(
  (request, response) => {
    if (request.url.includes('style.css')) {
      fileSystem.readFile('./style.css', (error, content) => {
        if (error) console.log(error);
        response.end(content);
      })
    }

    if (request.url.includes('index.html')) {
      fileSystem.readFile('./index.html', (error, content) => {
        if (error) console.log(error);
        response.end(content);
      })
    }

    if (request.url.includes('app.js')) {
      fileSystem.readFile('./app.js', (error, content) => {
        if (error) console.log(error);
        response.end(content);
      })
    }
  }
)
  .listen(PORT, () => console.log(`app running on port: ${PORT}`));