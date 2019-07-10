import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/app';

chai.should();

chai.use(chaiHttp);
let token = "bearer ";
let userId = "";
let anotherId = "";

describe('Users Authentication', () => {
    describe('POST /api/v1/auth/signup', () => {
        it('should add an admin user',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .field('email', 'test@test.co')
            .field('firstname', 'Way')
            .field('lastname', 'Farer')
            .field('password', 'Password1!')
            .field('isAdmin', 'true')
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
                firstname: 'Way',
                lastname: 'Farer',
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
                firstname: "Way",
                lastname: "Farer",
                password: "Password1!",
                isAdmin: true
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

        it('should check for wrong email formats',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test",
                firstname: "Way",
                lastname: "Farer",
                password: "Password1!",
                isAdmin: true
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Wrong email format");
                done()
            })
        });

        it('should check for wrong first name formats',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test@test.co",
                firstname: 123,
                lastname: "Farer",
                password: "Password1!",
                isAdmin: true
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("First name should only contain letters");
                done()
            })
        });

        it('should check for wrong last name formats',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test@test.co",
                firstname: "Abe",
                lastname: 123,
                password: "Password1!",
                isAdmin: true
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Last name should only contain letters");
                done()
            })
        });

        it('should check for wrong password formats',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test@test.co",
                firstname: "Abe",
                lastname: "Farer",
                password: "Passwor",
                isAdmin: true
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Password must contain minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
                done()
            })
        });

        it('should check for wrong image',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .field('email', 'tester@test.co')
            .field('firstname', 'Way')
            .field('lastname', 'Farer')
            .field('password', 'Password1!')
            .field('isAdmin', 'true')
            .attach('image', './test/files/non-pic.pdf', 'non-pic.pdf')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(500);
                done()
            })
        });
    });

    describe('POST /api/v1/auth/login', () => {
        it('should log in a user',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/login')
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
            .post('/api/v1/auth/login')
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
            .post('/api/v1/auth/login')
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
            .send({
                firstname: "Way",
                lastname: "Fare"
            })
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
            .send({
                firstname: "Way",
                lastname: "Fare"
            })
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
            .patch(`/api/v1/auth/abcd`)
            .set('authorization', token)
            .send({
                firstname: "Way",
                lastname: "Fare"
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
    });

    // describe('GET /api/v1/auth/profile/:userId', () => {
    //     it('should return profile of the selected user',  (done) => {
    //         chai.request(app)
    //         .get(`/api/v1/auth/profile/${userId}`)
    //         .set('Authorization', token)
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
    //         .set('Authorization', token)
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

    // describe('GET /api/v1/auth/profile/:userId', () => {
    //     it('should return profile of the selected user',  (done) => {
    //         chai.request(app)
    //         .get(`/api/v1/auth/profile/${userId}`)
    //         .set('Authorization', token)
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
    //         .set('Authorization', token)
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
    //         .set('Authorization', token)
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
    //         .set('Authorization', token)
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
    //         .set('Authorization', token)
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
    //         .set('Authorization', token)
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