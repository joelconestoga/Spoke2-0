const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);

// Work around to be able to reload Favorites in Production
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
const path = require('path');
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});