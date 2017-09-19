'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

const app = express();

app.use(morgan(':method :url :res[location] :status'));

app.use(bodyParser.json());
app.post('api/stories', (req, res) => {
  let { title, url } = req.body;
  knex('news')
    .insert({title: title, url: url})
    .returning(['id', 'title', 'url'])
    .then((story) => {
      console.log('returning posted data', story);
      res.status(201).json(story[0]);
    });
});

app.get('/api/stories', (req, res) => {
  let arrOfStories = [];
  let objOfStories = {};
  knex('news')
    .select('news.id as id', 'title', 'url', 'votes', 'tags.name as tag', 'tags.id as tagId')
    .innerJoin('news_tags', 'news.id', 'news_tags.id_news')
    .innerJoin('tags', 'news_tags.id_tags', tags.id)
    .innerJoin('author', 'news.id_author', 'author.id')
    .orderBy('title')
    .then((results) => {
      results.forEach((story) => {
        
      })
    });
});

// ADD YOUR ENDPOINTS HERE

/** if (require.main === module) ...
 * Only run this block if file is run using `npm start` or `node server.js`
 * Fixes error: "Trying to open unclosed connection." when running mocha tests
 */
if (require.main === module) {
  const server = app
    .listen(PORT, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error(err);
    });
}

module.exports = { app }; //! export app for testing