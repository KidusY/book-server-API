const express = require('express');
const bookmarkRouter = express.Router();
const store = require('../store');

const logger = require('../logger');
const bodyParser = express.json();
const knex = require('knex');
const services = require('../services/services');


bookmarkRouter
	.route('/')
	.get((req, res,next) => {
	//gets the db property from the server.js
	const knexInstance = req.app.get('db');
	services
		.getAllBookMarks(knexInstance)
		.then((bookmarks) => res.json(bookmarks))
		//Using next, the error is caught by the error handling middleware
		.catch(next);
	})
	.post(bodyParser, (req, res) => {
		const date = new Date();
		const {title,_url,_description,rating}= req.body;
	
	
		res.json(title);
	});

bookmarkRouter
	.route('/:id')
	.get((req, res,next) => {
		const id = req.path.split('/')[1];

		const knexInstance = req.app.get('db');
	services
		.getBookMark(knexInstance,id)
		.then((bookmarks) => res.json(bookmarks))
		//Using next, the error is caught by the error handling middleware
		.catch(next);
	
	})
	.delete((req, res) => {
		const id = req.path.split('/')[1];
		const bookmark = store.bookmarks.find((bookmark) => bookmark.id === id);

		if (bookmark) {
			store.bookmarks = store.bookmarks.filter((bookmark) => bookmark.id !== id);
			res.json(store.bookmarks);
		}
		else {
			logger.error(`Sorry can't find ${id}`);
			res.json(store.bookmarks);
			throw new Error(`Sorry can't find ${id}`);
		}
	});

module.exports = bookmarkRouter;
