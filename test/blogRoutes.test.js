const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Import your Express app
chai.use(chaiHttp);
const expect = chai.expect;

describe('Blog Routes', () => {
    let server;

    before((done) => {
        server = app.listen(3001, () => {
            done(); // Start the server on a different port (e.g., 3001)
        });
    });

    after((done) => {
        server.close(() => {
            done(); // Close the server after tests
        });
    });

    it('should return a list of blog posts (GET)', (done) => {
        chai
            .request(server)
            .get('/api/blog/posts')
            .end((err, res) => {
                if (err) {
                    console.error('Error in GET request:', err);
                    return done(err);
                }

                console.log('GET Response Status:', res.statusCode);
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should create a new blog post (POST)', (done) => {
        const newBlogPost = {
            id: 'test.json',
            title: 'New Test Post',
            content: 'This is a test post.',
        };

        chai
            .request(server)
            .post('/api/blog/posts')
            .send(newBlogPost)
            .end((err, res) => {
                if (err) {
                    console.error('Error in POST request:', err);
                    return done(err);
                }

                console.log('POST Response Status:', res.statusCode);
                expect(res).to.have.status(201);
                expect(res.body.message).to.equal('Blog post created successfully');
                done();
            });
    });

    it('should delete a test blog post by ID (DELETE)', (done) => {
        // Replace 'blogPostId' with an actual blog post ID to delete
        const blogPostId = 'test.json';

        chai
            .request(server)
            .delete(`/api/blog/posts/${blogPostId}`)
            .end((err, res) => {
                if (err) {
                    console.error('Error in DELETE request:', err);
                    return done(err);
                }

                console.log('DELETE Response Status:', res.statusCode);
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal('Blog post deleted successfully');
                done();
            });
    });

    it('should return an updated list of blog posts after POST (GET)', (done) => {
        chai
            .request(server)
            .get('/api/blog/posts')
            .end((err, res) => {
                if (err) {
                    console.error('Error in GET request:', err);
                    return done(err);
                }

                console.log('GET Response Status after POST:', res.statusCode);
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length.above(0); // Check if the list is not empty
                done();
            });
    });
});
