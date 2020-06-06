const {expect} = require('chai');
const knex = require('knex');
const app = require('../src/app');


describe.only('Bookmarks Endpoint',function(){
    let db;
    before('make knex instance',()=>{
        db = knex({
            client:'pg',
            connection:process.env.Test_DB_URL
        })

        app.set('db', db);
    })
    after('disconnect from db',()=>db.destroy());

    before('clean the table',()=>db('bookmarks-test').truncate());
    context('Given there are articles in the database', () => {
         const bookmarks = [
            {
                id          : 1,
                title       : 'Thinkful',
                _url         : 'https://www.thinkful.com',
                __description : 'Think outside the classroom',
                rating      : 5
            },
            {
                id          : 2,
                title       : 'Google',
                 _url         : 'https://www.google.com',
                ___description : 'Where we find everything else',
                rating      : 4
            },
            {
                id          : 3,
                title       : 'MDN',
                 _url         : 'https://developer.mozilla.org',
                __description : 'The only place to find web documentation',
                rating      : 5
            }
        ];
         
              beforeEach('insert bookmarks', () => {
                return db
                  .into('bookmarks')
                  .insert(bookmarks)
              })
            })


            it('GET /bookmarks responds with 200 and all of the articles', () => {
                     return supertest(app)
                       .get('/bookmarks')
                       .expect(200)
                       // TODO: add more assertions about the body
                   })
})