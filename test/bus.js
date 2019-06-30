import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();

chai.use(chaiHttp);
let token = "bearer ";
let notToken = "bearer shdbfkfk";
let notAdmin = "bearer ";

describe('Buses', () => {
    describe('Get tokens', () => {
        it('should add a user',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: "non@test.co",
                firstname: "Way",
                lastname: "Farer",
                password: "Password1!"
            })
            .then((res) => {
                const body = res.body;
                notAdmin += body.data.token;
                
                done()
            })
        });

        it('should log in a user',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/login')
            .send({
                email: "test@test.co",
                password: "Password1!"
            })
            .then((res) => {
                const body = res.body;
                token += body.data.token;
                
                done()
            })
        });
    })

    describe('POST /api/v1/bus', () => {
        it('should add a bus',  (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', token)
            .send({
                numberPlate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: 2008,
                capacity: 5
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(201);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('id');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
        });

        it('should check for bus that already exists', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('Authorization', token)
            .send({
                numberPlate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: 2008,
                capacity: 5
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(409);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("A bus with same plate number already exists");
                done()
            })
        });

        it('should check for invalid token', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', notToken)
            .send({
                numberPlate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: 2008,
                capacity: 5
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(401);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Token is invalid or not provided");
                done()
            })
        });

        it('should check admin access', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', notAdmin)
            .send({
                numberPlate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: 2008,
                capacity: 5
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(401);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Admin access only");
                done()
            })
        });

        it('should check for wrong number plate format', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', token)
            .send({
                numberPlate: 1,
                manufacturer: "Toyota",
                model: "Siena",
                year: "2008"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Number plate accepts only letters and numbers");
                done()
            })
        });

        it('should check for wrong manufacturer format', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', token)
            .send({
                numberPlate: "1",
                manufacturer: 1,
                model: "Siena",
                year: "2008"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Manufacturer accepts only letters");
                done()
            })
        });

        it('should check for wrong model format', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', token)
            .send({
                numberPlate: "1",
                manufacturer: "Toyota",
                model: 1,
                year: "2008"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Model accepts only letters");
                done()
            })
        });

        it('should check for wrong image format', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', token)
            .send({
                numberPlate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: 2008,
                capacity: 5,
                image: "abc"
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

        it('should check for wrong color format', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', token)
            .send({
                numberPlate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: 2008,
                capacity: 5,
                color: true
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Color accepts only letters");
                done()
            })
        });

        it('should check for wrong year data type', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', token)
            .send({
                numberPlate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: "2008",
                capacity: 5,
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Year must be a number");
                done()
            })
        });

        it('should check for wrong year format', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', token)
            .send({
                numberPlate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: 12,
                capacity: 5,
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Year must take the format yyyy");
                done()
            })
        });

        it('should check for wrong capacity format', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', token)
            .send({
                numberPlate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: 1234,
                capacity: "w",
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('error');
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Enter a valid bus capacity greater than 0");
                done()
            })
        });
    });

    // describe('PUT /api/v1/bus/update/:busId', () => {
    //     it('should update a bus data',  (done) => {
    //         chai.request(app)
    //         .put(`/api/v1/bus/update/${busId}`)
    //         .set('Authorization', token)
    //         .send({
    //             capacity:8
    //         })
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(201);
    //             expect(body).to.contain.property('status');
    //             expect(body).to.contain.property('data');
    //             expect(body.data).to.contain.property('id');
    //             expect(body.status).to.equal("success");
    //             expect(body.data).to.be.an("object");
    //             done()
    //         })
    //     });

    //     it('should check for bus that does not exist', (done) => {
    //         chai.request(app)
    //         .put(`/api/v1/bus/update/${busId}`)
    //         .set('Authorization', token)
    //         .send({
    //             capacity: 5
    //         })
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(404);
    //             expect(body).to.contain.property('status');
    //             expect(body).to.contain.property('error');
    //             expect(body.status).to.equal("error");
    //             expect(body.error).to.be.a("string");
    //             expect(body.error).to.equal("This bus does not exist");
    //             done()
    //         })
    //     });
    // });

    // describe('GET /api/v1/bus/all', () => {
    //     it('should return all buses',  (done) => {
    //         chai.request(app)
    //         .get('/api/v1/bus/all')
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
    // });

    // describe('GET /api/v1/bus/single/:busId', () => {
    //     it('should return the data of selected bus',  (done) => {
    //         chai.request(app)
    //         .get(`/api/v1/bus/single/${busId}`)
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

    //     it('should return error for bus that does exist',  (done) => {
    //         chai.request(app)
    //         .get(`/api/v1/bus/single/none`)
    //         .set('Authorization', token)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(404);
    //             expect(body).to.contain.property('status');
    //             expect(body).to.contain.property('error');
    //             expect(body.status).to.equal("error");
    //             expect(body.error).to.be.a("string");
    //             expect(body.error).to.equal("This bus does not exist");
    //             done()
    //         })
    //     });
    // });

    // describe('DELETE /api/v1/bus/delete/:busId', () => {
    //     it('should remove the selected bus from the database',  (done) => {
    //         chai.request(app)
    //         .delete(`/api/v1/bus/delete/${busId}`)
    //         .set('Authorization', token)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(200);
    //             expect(body).to.contain.property('status');
    //             expect(body.status).to.equal("success");
    //             done()
    //         })
    //     });

    //     it('should return error for bus that does exist',  (done) => {
    //         chai.request(app)
    //         .get(`/api/v1/bus/delete/none`)
    //         .set('Authorization', token)
    //         .then((res) => {
    //             const body = res.body;
    //             expect(res.status).to.equal(404);
    //             expect(body).to.contain.property('status');
    //             expect(body).to.contain.property('error');
    //             expect(body.status).to.equal("error");
    //             expect(body.error).to.be.a("string");
    //             expect(body.error).to.equal("This bus does not exist");
    //             done()
    //         })
    //     });
    // });
})