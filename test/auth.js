import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('Users Authentication', () => {
    describe('POST /api/v1/auth/signup', () => {
        it('should add a user',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({})
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

        it('should check if user exists',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("User exists already");
                done()
            })
        });

        it('should check for wrong input formats',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/signup')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Wrong data format");
                done()
            })
        });
    });

    describe('POST /api/v1/auth/login', () => {
        it('should log in a user',  (done) => {
            chai.request(app)
            .post('/api/v1/auth/login')
            .send({})
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

        it('should check if user does not exists', (done) => {
            chai.request(app)
            .post('/api/v1/auth/login')
            .send({})
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("User does not exist");
                done()
            })
        });
    });
})