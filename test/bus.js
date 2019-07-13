import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../server/app';

chai.should();

chai.use(chaiHttp);
let token = 'bearer ';
const notToken = 'bearer shdbfkfk';
let notAdmin = 'bearer ';

describe('Buses', () => {
  describe('POST /api/v1/bus', () => {
    it('should sign in a non-admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'non@test.co',
          password: 'Password1!',
        })
        .then((res) => {
          const { body } = res;
          notAdmin += body.data.token;
          done();
        });
    });

    it('should sign in an admin', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'test@test.co',
          password: 'Password1!',
        })
        .then((res) => {
          const { body } = res;
          token += body.data.token;

          done();
        });
    });

    it('should add a bus', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('authorization', token)
        .field('number_plate', 'test@test.co')
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('year', '1234')
        .field('capacity', '5')
        .then((res) => {
          const { body } = res;
          console.log(body.error)
          expect(res.status).to.equal(201);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('object');
          done();
        });
    });

    it('should check for bus that already exists', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('authorization', token)
        .field('number_plate', 'test@test.co')
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('year', '1234')
        .field('capacity', '5')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(409);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('A bus with same plate number already exists');
          done();
        });
    });

    it('should check for invalid token', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('authorization', notToken)
        .field('number_plate', 'test@test.co')
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('year', '1234')
        .field('capacity', '5')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(401);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Token is invalid or not provided');
          done();
        });
    });

    it('should check admin access', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('authorization', notAdmin)
        .field('number_plate', 'test@test.co')
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('year', '1234')
        .field('capacity', '5')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(401);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Admin access only');
          done();
        });
    });

    it('should check for missing plate number', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('authorization', token)
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('year', '1234')
        .field('capacity', '5')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Number plate is missing');
          done();
        });
    });

    it('should check for missing manufacturer', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('authorization', token)
        .field('number_plate', 'test@test.co')
        .field('model', 'Farer')
        .field('year', '1234')
        .field('capacity', '5')
        .attach('image', './test/files/pic.jpg', 'pic.jpg')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Manufacturer is missing');
          done();
        });
    });

    it('should check for missing model', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('authorization', token)
        .field('number_plate', 'test@test.co')
        .field('manufacturer', 'Way')
        .field('year', '1234')
        .field('capacity', '5')
        .attach('image', './test/files/pic.jpg', 'pic.jpg')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Model of bus is missing');
          done();
        });
    });
    
    it('should check for missing year', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('authorization', token)
        .field('number_plate', 'test@test.co')
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('capacity', '5')
        .attach('image', './test/files/pic.jpg', 'pic.jpg')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Year of bus is missing');
          done();
        });
    });

    it('should check for missing capacity', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('authorization', token)
        .field('number_plate', 'test@test.co')
        .field('manufacturer', 'Way')
        .field('model', 'Farer')
        .field('year', '1234')
        .attach('image', './test/files/pic.jpg', 'pic.jpg')
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Bus capacity is missing');
          done();
        });
    });
  });

  // describe('PUT /api/v1/bus/update/:busId', () => {
  //     it('should update a bus data',  (done) => {
  //         chai.request(app)
  //         .put(`/api/v1/bus/update/${busId}`)
  //         .set('authorization', token)
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
  //         .set('authorization', token)
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
  // });

  // describe('GET /api/v1/bus/single/:busId', () => {
  //     it('should return the data of selected bus',  (done) => {
  //         chai.request(app)
  //         .get(`/api/v1/bus/single/${busId}`)
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

  //     it('should return error for bus that does exist',  (done) => {
  //         chai.request(app)
  //         .get(`/api/v1/bus/single/none`)
  //         .set('authorization', token)
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
  //         .set('authorization', token)
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
  //         .set('authorization', token)
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
});
