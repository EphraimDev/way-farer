import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();

chai.use(chaiHttp);
let token = "";
let userId = "";

describe('Users Authentication', () => {
    describe('POST /api/v1/auth/signup', () => {
        it('should add a user',  (done) => {
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
                userId = body.data.id;
                expect(res.status).to.equal(201);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('token');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
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

        it('should check for wrong admin format',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test@test.co",
                firstname: "Abe",
                lastname: "Farer",
                password: "Password1!",
                isAdmin: 123
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Admin should be a boolean");
                done()
            })
        });

        it('should check for wrong image',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "test@test.co",
                firstname: "Abe",
                lastname: "Farer",
                password: "Password1!",
                isAdmin: true,
                img: "abc"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Add a valid image");
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
                userId = body.data.id;
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

    // describe(`PUT /api/v1/auth/update/:userId`, () => {
    //     it('should modify a user profile',  (done) => {
    //         chai.request(app)
    //         .put(`/api/v1/auth/update/${userId}`)
    //         .set('Authorization', token)
    //         .send({
    //             email: "test@test.co",
    //             first_name: "Way",
    //             last_name: "Fare",
    //             password: "Password1!",
    //             is_admin: false
    //         })
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

    //     it('should check if user exists',  (done) => {
    //         chai.request(app)
    //         .put(`/api/v1/auth/update/userId`)
    //         .set('Authorization', token)
    //         .send({
    //             email: "test@test.co",
    //             first_name: "Way",
    //             last_name: "Farer",
    //             password: "Password1!",
    //             is_admin: true
    //         })
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

    //     it('should check for wrong input formats',  (done) => {
    //         chai.request(app)
    //         .put(`/api/v1/auth/update/${userId}`)
    //         .set('Authorization', token)
    //         .send({
    //             email: "test",
    //             first_name: "Way",
    //             last_name: "Farer",
    //             password: "Pass"
    //         })
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(400);
    //             expect(body).to.contain.property('status');
    //             expect(body).to.contain.property('error');
    //             expect(body.status).to.equal("error");
    //             expect(body.error).to.be.a("string");
    //             expect(body.error).to.equal("Wrong email or password format");
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