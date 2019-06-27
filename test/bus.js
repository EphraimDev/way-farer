import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('Buses', () => {
    describe('POST /api/v1/bus', () => {
        it('should add a bus',  (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .send({
                number_plate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: "2008",
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
            .send({
                number_plate: "ABC123DE",
                manufacturer: "Toyota",
                model: "Siena",
                year: "2008",
                capacity: 5
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("A bus with same plate number already exists");
                done()
            })
        });

        it('should check for incomplete data', (done) => {
            chai.request(app)
            .post('/api/v1/bus')
            .send({
                number_plate: "ABC123DF",
                manufacturer: "Toyota",
                model: "Siena",
                year: "2008"
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

    describe('GET /api/v1/bus/all', () => {
        it('should return all buses',  (done) => {
            chai.request(app)
            .get('/api/v1/bus')
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(201);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
        });
    });
})