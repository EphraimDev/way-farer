import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/app';

chai.should();

chai.use(chaiHttp);
let token = "bearer ";
let userId = "";
let anotherId = "bearer ";

describe('Users Authentication', () => {
    describe('POST /api/v1/auth/signup', () => {
        it('should add an admin user',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .field('email', 'test@test.co')
            .field('first_name', 'Way')
            .field('last_name', 'Farer')
            .field('password', 'Password1!')
            .field('is_admin', 'true')
            .attach('image', './test/files/pic.jpg', 'pic.jpg')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(201);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('token');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
        });

        it('should add a user', (done) => {
            chai.request(app)
              .post('/api/v1/auth/signup')
              .send({
                email: 'non@test.co',
                first_name: 'Way',
                last_name: 'Farer',
                password: 'Password1!',
              })
              .then((res) => {
                const { body } = res;
                anotherId = body.data.user_id;
                expect(res.status).to.equal(201);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('token');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done();
              });
          });

        it('should check if user exists',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test@test.co",
                first_name: "Way",
                last_name: "Farer",
                password: "Password1!",
                is_admin: true
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(409);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("User exists already");
                done()
            })
        });

        it('should check for no email',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                first_name: "Way",
                last_name: "Farer",
                password: "Password1!",
                is_admin: true
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Email is required");
                done()
            })
        });

        it('should check for no first name',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test@test.co",
                last_name: "Farer",
                password: "Password1!",
                is_admin: true
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("First name is required");
                done()
            })
        });

        it('should check for no last name',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test@test.co",
                first_name: "Abe",
                password: "Password1!",
                is_admin: true
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Last name is required");
                done()
            })
        });

        it('should check for no password',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test@test.co",
                first_name: "Abe",
                last_name: "Farer",
                is_admin: true
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Password is required");
                done()
            })
        });
 
        it('should check for wrong image',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .field('email', 'tester@test.co')
            .field('first_name', 'Way')
            .field('last_name', 'Farer')
            .field('password', 'Password1!')
            .field('is_admin', 'true')
            .attach('image', './test/files/non-pic.pdf', 'non-pic.pdf')
            .then((res) => {
                expect(res.status).to.equal(500);
                done()
            })
        });
    });

    describe('POST /api/v1/auth/signin', () => {
        it('should log in a user',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: "test@test.co",
                password: "Password1!"
            })
            .then((res) => {
                const body = res.body;
                userId = body.data.user_id;
                token += body.data.token;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('token');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
        });

        it('should check if user does not exists', (done) => {
            chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: "tes@test.co",
                password: "Password1!"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("User does not exist");
                done()
            })
        });

        it('should for wrong email-password combination', (done) => {
            chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: "test@test.co",
                password: "Password1!r"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(401);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Email or password incorrect");
                done()
            })
        });
    });

    describe(`PATCH /api/v1/auth/:userId`, () => {
        it('should update a user profile',  (done) => {
            chai.request(app)
            .patch(`/api/v1/auth/${userId}`)
            .set('authorization', token)
            .field('first_name', 'Way')
            .field('last_name', 'Fare')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
        });

        it('should check if user is authorized',  (done) => {
            chai.request(app)
            .patch(`/api/v1/auth/${anotherId}`)
            .set('authorization', token)
            .field('first_name', 'Way')
            .field('last_name', 'Fare')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(401);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("User not authorized");
                done()
            })
        });

        it('should check if user exists',  (done) => {
            chai.request(app)
            .patch(`/api/v1/auth/12`)
            .set('authorization', token)
            .field('first_name', 'Way')
            .field('last_name', 'Fare')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("User does not exist");
                done()
            })
        });
    });

    describe('GET /api/v1/auth/all', () => {
        it('should return all users',  (done) => {
            chai.request(app)
            .get(`/api/v1/auth/all`)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("array");
                done()
            })
        });
    });

    // describe('GET /api/v1/auth/profile/:userId', () => {
    //     it('should return profile of the selected user',  (done) => {
    //         chai.request(app)
    //         .get(`/api/v1/auth/profile/${userId}`)
    //         .set('authorization', token)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(201);
    //             expect(body).to.contain.property('status');
    //             expect(body).to.contain.property('data');
    //             expect(body.status).to.equal("success");
    //             expect(body.data).to.be.an("object");
    //             done()
    //         })
    //     });

    //     it('should check for user that do not exist ',  (done) => {
    //         chai.request(app)
    //         .get(`/api/v1/auth/profile/none`)
    //         .set('authorization', token)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(404);
    //             expect(body).to.contain.property('status');
    //             expect(body).to.contain.property('error');
    //             expect(body.status).to.equal("error");
    //             expect(body.error).to.be.a("string");
    //             expect(body.error).to.equal("User does not exist");
    //             done()
    //         })
    //     });
    // });

    // describe('GET /api/v1/auth/admin/all-users', () => {
    //     it('should return the profile of the all users',  (done) => {
    //         chai.request(app)
    //         .get(`/api/v1/auth/admin/all-users`)
    //         .set('authorization', token)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(200);
    //             expect(body).to.contain.property('status');
    //             expect(body).to.contain.property('data');
    //             expect(body.status).to.equal("success");
    //             expect(body.data).to.be.an("object");
    //             done()
    //         })
    //     });

    //     it('should check for admin status of user',  (done) => {
    //         chai.request(app)
    //         .get(`/api/v1/auth/admin/all-users`)
    //         .set('authorization', token)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(401);
    //             expect(body).to.contain.property('status');
    //             expect(body).to.contain.property('error');
    //             expect(body.status).to.equal("error");
    //             expect(body.error).to.be.a("string");
    //             expect(body.error).to.equal("Unauthorized request");
    //             done()
    //         })
    //     });
    // });

    // describe('DELETE /api/v1/auth/delete/:userId', () => {
    //     it('should delete the user from the database',  (done) => {
    //         chai.request(app)
    //         .delete(`/api/v1/auth/delete/${userId}`)
    //         .set('authorization', token)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(200);
    //             expect(body).to.contain.property('status');
    //             expect(body.status).to.equal("success");
    //             done()
    //         })
    //     });

    //     it('should check for admin status of user',  (done) => {
    //         chai.request(app)
    //         .get(`/api/v1/auth/delete/none`)
    //         .set('authorization', token)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(404);
    //             expect(body).to.contain.property('status');
    //             expect(body).to.contain.property('error');
    //             expect(body.status).to.equal("error");
    //             expect(body.error).to.be.a("string");
    //             expect(body.error).to.equal("User does not exist");
    //             done()
    //         })
    //     });
    // });
})