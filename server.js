//load dependencies
const express = require('express');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// set up sessions
const sess = {
   secret: 'Jack Burton',
   cookie: {},
   resave: false,
   saveUninitialized: true,
   store: new SequelizeStore({
      db: sequelize
   })
};

//set up express app
const app = express()
.get('/cool', (req, res) => res.send(cool()));
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// turn on routes
app.use(routes);

//set up handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log(`Nice job! Server listening on port ${PORT}!`));
});