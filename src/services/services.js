const services = {
	getAllBookMarks (db) {
		return db.select('*').from('bookmarks');
	},

	getBookMark(db,title){
		console.log(title);
		return db.select('*').from('bookmarks').where('id',title);
	}
	
};

module.exports = services;
