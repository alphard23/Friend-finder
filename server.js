const express = require('express');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const bodyParser = require('body-parser');

const app = express();

// set up handlebars view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

// Static files
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes
require('./controllers/apiRoutes.js')(app);
require('./controllers/htmlRoutes.js')(app);

// Starts the server
app.listen(app.get('port'), function() {
  console.log(`App listening on PORT ${app.get('port')}`);
})
