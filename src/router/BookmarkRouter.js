const express = require('express');
const bookmarkRouter = express.Router();
const store = require('../store');
const { v4: uuid } = require('uuid');
const logger = require('../logger');
const bodyParser = express.json();
bookmarkRouter
	.route('/')
	.get((req, res) => {
		res.json(store.bookmarks);
	})
	.post(bodyParser, (req, res) => {
		const bookmark = {
			id          : uuid(),
			title       : '',
			url         : '',
			description : '',
			rating      : ''
		};

		const { title, url, description, rating } = req.body;
		bookmark.title = title;
		bookmark.url = url;
		bookmark.description = description;
		bookmark.rating = rating;
		store.bookmarks.push(bookmark);
		res.json(store.bookmarks);
	});

bookmarkRouter
	.route('/:id')
	.get((req, res) => {
		const id = req.path.split('/')[1];

		const bookmark = store.bookmarks.find((bookmark) => bookmark.id === id);

		if (bookmark) {
			res.json(bookmark);
		}
		else {
			logger.error(`Sorry can't find ${id}`);
			throw new Error(`Sorry can't find ${id}`);
		}
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
