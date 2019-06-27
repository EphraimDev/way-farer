import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();

chai.use(chaiHttp);
let tripId = '';

describe('Bookings', () => {
    describe('POST /api/v1/booking/create', () => {
        it('should book a trip',  (done) => {
            chai.request(app)
            .post('/api/v1/booking/create')
            .set('Authorization', token)
            .send({
                bus_id: "ABC12DE",
                trip_id: "CMS",
                created_on: "10/12/2019",
                seat_no: 3
            })
            .then((res) => {
                const body = res.body;
                tripId = body.data.id;
                expect(res.status).to.equal(201);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('id');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
        });

        it('should check for trip that has started already', (done) => {
            chai.request(app)
            .post('/api/v1/booking/create')
            .set('Authorization', token)
            .send({
                bus_id: "ABC12DE",
                trip_id: "CMS",
                created_on: "10/12/2019",
                seat_no: 3
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This trip has started already");
                done()
            })
        });

        it('should check for trip that does not exist', (done) => {
            chai.request(app)
            .post('/api/v1/booking/create')
            .set('Authorization', token)
            .send({
                bus_id: "ABC12DE",
                trip_id: "CMS",
                created_on: "10/12/2019",
                seat_no: 3
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This trip does not exist");
                done()
            })
        });

        it('should check for bus that does not exist', (done) => {
            chai.request(app)
            .post('/api/v1/booking/create')
            .set('Authorization', token)
            .send({
                bus_id: "ABC12DE",
                trip_id: "CMS",
                created_on: "10/12/2019",
                seat_no: 3
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This bus does not exist");
                done()
            })
        });

        it('should check for trip that is canceled', (done) => {
            chai.request(app)
            .post('/api/v1/trips/create')
            .set('Authorization', token)
            .send({
                bus_id: "ABC12DE",
                trip_id: "CMS",
                created_on: "10/12/2019",
                seat_no: 3
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This trip is canceled");
                done()
            })
        });
    });

    describe('PUT /api/v1/booking/modify/:bookingId', () => {
        it('should modify a booking',  (done) => {
            chai.request(app)
            .put(`/api/v1/booking/modify/${bookingId}`)
            .set('Authorization', token)
            .send({
                seat_no: 1
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('id');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
        });

        it("should fail for booking that don't exists", (done) => {
            chai.request(app)
            .put('/api/v1/trips/modify/none')
            .set('Authorization', token)
            .send({
                seat_no: 1
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This booking does not exist");
                done()
            })
        });

        it('should check for trip that has been started', (done) => {
            chai.request(app)
            .put('/api/v1/trips/modify/2')
            .set('Authorization', token)
            .send({
                seat_no: 5
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This trip has started already");
                done()
            })
        });
    });

    describe('GET /api/v1/booking/all', () => {
        it('should return all bookings',  (done) => {
            chai.request(app)
            .get('/api/v1/booking/all')
            .set('Authorization', token)
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
    });

    describe('GET /api/v1/booking/user/:userId', () => {
        it('should get the all bookings made by the user',  (done) => {
            chai.request(app)
            .get(`/api/v1/booking/user/${userId}`)
            .set('Authorization', token)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('id');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
        });

        it("should fail for trips that don't exists", (done) => {
            chai.request(app)
            .get('/api/v1/trips/trip/none')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This trip does not exist");
                done()
            })
        });
    });

    describe('DELETE /api/v1/trips/cancel/:tripId', () => {
        it('should cancel the trip',  (done) => {
            chai.request(app)
            .delete(`/api/v1/trips/cancel/${tripId}`)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body.status).to.equal("success");
                done()
            })
        });

        it("should fail for trips that don't exists", (done) => {
            chai.request(app)
            .get('/api/v1/trips/cancel/none')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This trip does not exist");
                done()
            })
        });
    });

    describe('GET /api/v1/trips/filter/origin?query=', () => {
        it('should return all the trips matching origin query',  (done) => {
            chai.request(app)
            .get(`/api/v1/trips/filter/origin?query=${type}`)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body.status).to.equal("success");
                done()
            })
        });

        it("should return null if search query does not exist", (done) => {
            chai.request(app)
            .get(`/api/v1/trips/filter/origin?query=${type}`)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("No trip available");
                done()
            })
        });
    });

    describe('GET /api/v1/trips/filter/origin?query=', () => {
        it('should return all the trips matching origin query',  (done) => {
            chai.request(app)
            .get(`/api/v1/trips/filter/origin?query=${type}`)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body.status).to.equal("success");
                done()
            })
        });

        it("should return null if search query does not exist", (done) => {
            chai.request(app)
            .get(`/api/v1/trips/filter/origin?query=none`)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("No trip available");
                done()
            })
        });
    });

    describe('GET /api/v1/trips/filter/destination?query=', () => {
        it('should return all the trips matching destination query',  (done) => {
            chai.request(app)
            .get(`/api/v1/trips/filter/origin?query=${type}`)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body.status).to.equal("success");
                done()
            })
        });

        it("should return null if search query does not exist", (done) => {
            chai.request(app)
            .get(`/api/v1/trips/filter/origin?query=none`)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("No trip available");
                done()
            })
        });
    });
})