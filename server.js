const express = require('express');
const models = require('./server/models')
const routes = require('./server/routes');

const app = express();

const bodyParser = require('body-parser')

// bodyparser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// routes
app.use('/', routes);

const PORT = process.env.PORT || 5000

app.listen(PORT, (err) => {
  if (!err) {

    models.sequelize.sync()
      .then(() => {
        console.log('Database is running')
      })
      .catch((err) => {
        console.log(err, 'Something went wrong with the Database update')
      })

    console.log('Site is live');

  } else {
    console.log('err');
  }
})
