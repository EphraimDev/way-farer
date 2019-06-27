import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import { type } from 'os';

chai.should();

chai.use(chaiHttp);
let tripId = '';

describe('Trips', () => {
    describe('POST /api/v1/trips', () => {
        it('should create a trip',  (done) => {
            chai.request(app)
            .post('/api/v1/trips/create')
            .send({
                bus_id: "ABC12DE",
                origin: "Ikeja",
                destination: "CMS",
                trip_date: "10/12/2019",
                trip_time: "4:21:38 AM",
                fare: 500.00
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

        it('should check for trip that already exists', (done) => {
            chai.request(app)
            .post('/api/v1/trips/create')
            .send({
                bus_id: "ABC12DE",
                origin: "Ikeja",
                destination: "CMS",
                trip_date: "10/12/2019",
                trip_time: "8:21:38 AM",
                fare: 500.00
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This bus has an active trip");
                done()
            })
        });

        it('should check for incomplete data', (done) => {
            chai.request(app)
            .post('/api/v1/trips/create')
            .send({
                bus_id: "FBC12DE",
                destination: "CMS",
                trip_date: "10/12/2019",
                fare: 500.00,
                status: "active"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Some important data are missing");
                done()
            })
        });
    });

    describe('PUT /api/v1/trips/modify/:tripId', () => {
        it('should modify a trip',  (done) => {
            chai.request(app)
            .put(`/api/v1/trips/modify/${tripId}`)
            .send({
                bus_id: "ABC12DE",
                origin: "Ikeja",
                destination: "Oshodi",
                trip_date: "10/12/2019",
                trip_time: "4:21:38 AM",
                fare: 500.00
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

        it("should fail for trips that don't exists", (done) => {
            chai.request(app)
            .put('/api/v1/trips/modify/none')
            .send({
                bus_id: "ABC12DE",
                origin: "Ikeja",
                destination: "CMS",
                trip_date: "10/12/2019",
                fare: 500.00
            })
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

        it('should check for trip that has been canceled', (done) => {
            chai.request(app)
            .put('/api/v1/trips/modify/2')
            .send({
                bus_id: "FBC22DE",
                destination: "CMS",
                trip_date: "10/12/2019",
                fare: 500.00
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This trip has been canceled");
                done()
            })
        });

        it('should check for trip that has started', (done) => {
            chai.request(app)
            .put('/api/v1/trips/modify/2')
            .send({
                bus_id: "FBC22DE",
                destination: "CMS",
                trip_date: "10/12/2019",
                fare: 500.00
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

    describe('GET /api/v1/trips/all', () => {
        it('should return all trips',  (done) => {
            chai.request(app)
            .get('/api/v1/trip/all')
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

    describe('GET /api/v1/trips/trip/:tripId', () => {
        it('should get the details of a trip',  (done) => {
            chai.request(app)
            .get(`/api/v1/trips/trip/${tripId}`)
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