import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();

chai.use(chaiHttp);
let token = 'bearer ';
let notAdmin = 'bearer ';
let tripId;

describe('Trips', () => {
  describe('Get tokens', () => {
    it('should add a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
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

    it('should log in a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
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
  });
  describe('POST /api/v1/trips', () => {
    it('should create a trip', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          busId: 1,
          origin: 'Ikeja',
          destination: 'CMS',
          tripDate: '10/12/2019',
          tripTime: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          tripId = body.data.id;
          expect(res.status).to.equal(201);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.data).to.contain.property('id');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('object');
          done();
        });
    });

    it('should check for trip that already exists', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          busId: 1,
          origin: 'Ikeja',
          destination: 'CMS',
          tripDate: '10/12/2019',
          tripTime: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(409);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('A trip with this bus is active');
          done();
        });
    });

    it('should check for wrong bus ID', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          busId: 10,
          origin: 'Ikeja',
          destination: 'CMS',
          tripDate: '10/12/2019',
          tripTime: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(409);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Selected bus does not exist');
          done();
        });
    });

    it('should check admin access', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', notAdmin)
        .send({
          busId: 1,
          origin: 'Ikeja',
          destination: 'CMS',
          tripDate: '10/12/2019',
          tripTime: '4:21:38 AM',
          fare: 500.00,
        })
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

    it('should check for wrong bus id', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          busId: '1',
          origin: 'Ikeja',
          destination: 'CMS',
          tripDate: '10/12/2019',
          tripTime: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Bus ID is a number');
          done();
        });
    });

    it('should check for wrong trip origin format', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          busId: 1,
          origin: 2,
          destination: 'CMS',
          tripDate: '10/12/2019',
          tripTime: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Origin is a string');
          done();
        });
    });

    it('should check for wrong destination format', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          busId: 1,
          origin: 'Ikeja',
          destination: 1,
          tripDate: '10/12/2019',
          tripTime: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Destination is a string');
          done();
        });
    });

    it('should check for date format', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          busId: 1,
          origin: 'Ikeja',
          destination: 'CMS',
          tripDate: 24,
          tripTime: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Trip date is a string in format yyyy-mm-dd');
          done();
        });
    });

    it('should check for time format', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          busId: 1,
          origin: 'Ikeja',
          destination: 'CMS',
          tripDate: '10/12/2019',
          tripTime: 2,
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Trip time is a string in format hh:mm:ss');
          done();
        });
    });

    it('should check for fare format', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          busId: 1,
          origin: 'Ikeja',
          destination: 'CMS',
          tripDate: '10/12/2019',
          tripTime: '4:21:38 AM',
          fare: '500.00',
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Fare must be a number');
          done();
        });
    });
  });

  describe('DELETE /api/v1/trips/:tripId', () => {
    it('should cancel a trip', (done) => {
      chai.request(app)
        .delete(`/api/v1/trips/${tripId}`)
        .set('authorization', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(200);
          expect(body).to.contain.property('status');
          expect(body.status).to.equal('success');
          done();
        });
    });

    it('should check admin access', (done) => {
      chai.request(app)
        .delete('/api/v1/trips/1')
        .set('authorization', notAdmin)
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

    it("should fail for trips that don't exists", (done) => {
      chai.request(app)
        .delete('/api/v1/trips/5')
        .set('authorization', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(404);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Trip does not exist');
          done();
        });
    });

    it('should create a trip', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('authorization', token)
        .send({
          busId: 1,
          origin: 'Ikeja',
          destination: 'CMS',
          tripDate: '2019-01-01',
          tripTime: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          tripId = body.data.id;
          done();
        });
    });

    it('should check for trip that cannot be canceled', (done) => {
      chai.request(app)
        .delete(`/api/v1/trips/${tripId}`)
        .set('authorization', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Trip cannot be cancelled');
          done();
        });
    });
  });
});


//     describe('GET /api/v1/trips/all', () => {
//         it('should return all trips',  (done) => {
//             chai.request(app)
//             .get('/api/v1/trip/all')
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(200);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('data');
//                 expect(body.status).to.equal("success");
//                 expect(body.data).to.be.an("object");
//                 done()
//             })
//         });
//     });

//     describe('GET /api/v1/trips/trip/:tripId', () => {
//         it('should get the details of a trip',  (done) => {
//             chai.request(app)
//             .get(`/api/v1/trips/trip/${tripId}`)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(200);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('data');
//                 expect(body.data).to.contain.property('id');
//                 expect(body.status).to.equal("success");
//                 expect(body.data).to.be.an("object");
//                 done()
//             })
//         });

//         it("should fail for trips that don't exists", (done) => {
//             chai.request(app)
//             .get('/api/v1/trips/trip/none')
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(404);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('error');
//                 expect(body.status).to.equal("error");
//                 expect(body.error).to.be.a("string");
//                 expect(body.error).to.equal("This trip does not exist");
//                 done()
//             })
//         });
//     });

//     describe('DELETE /api/v1/trips/cancel/:tripId', () => {
//         it('should cancel the trip',  (done) => {
//             chai.request(app)
//             .delete(`/api/v1/trips/cancel/${tripId}`)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(200);
//                 expect(body).to.contain.property('status');
//                 expect(body.status).to.equal("success");
//                 done()
//             })
//         });

//         it("should fail for trips that don't exists", (done) => {
//             chai.request(app)
//             .delete('/api/v1/trips/cancel/none')
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(404);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('error');
//                 expect(body.status).to.equal("error");
//                 expect(body.error).to.be.a("string");
//                 expect(body.error).to.equal("This trip does not exist");
//                 done()
//             })
//         });
//     });

//     describe('GET /api/v1/trips/filter/origin?query=', () => {
//         it('should return all the trips matching origin query',  (done) => {
//             chai.request(app)
//             .get(`/api/v1/trips/filter/origin?query=${type}`)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(200);
//                 expect(body).to.contain.property('status');
//                 expect(body.status).to.equal("success");
//                 done()
//             })
//         });

//         it("should return null if search query does not exist", (done) => {
//             chai.request(app)
//             .get(`/api/v1/trips/filter/origin?query=${type}`)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(404);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('error');
//                 expect(body.status).to.equal("error");
//                 expect(body.error).to.be.a("string");
//                 expect(body.error).to.equal("No trip available");
//                 done()
//             })
//         });
//     });

//     describe('GET /api/v1/trips/filter/origin?query=', () => {
//         it('should return all the trips matching origin query',  (done) => {
//             chai.request(app)
//             .get(`/api/v1/trips/filter/origin?query=${type}`)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(200);
//                 expect(body).to.contain.property('status');
//                 expect(body.status).to.equal("success");
//                 done()
//             })
//         });

//         it("should return null if search query does not exist", (done) => {
//             chai.request(app)
//             .get(`/api/v1/trips/filter/origin?query=none`)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(404);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('error');
//                 expect(body.status).to.equal("error");
//                 expect(body.error).to.be.a("string");
//                 expect(body.error).to.equal("No trip available");
//                 done()
//             })
//         });
//     });

//     describe('GET /api/v1/trips/filter/destination?query=', () => {
//         it('should return all the trips matching destination query',  (done) => {
//             chai.request(app)
//             .get(`/api/v1/trips/filter/origin?query=${type}`)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(200);
//                 expect(body).to.contain.property('status');
//                 expect(body.status).to.equal("success");
//                 done()
//             })
//         });

//         it("should return null if search query does not exist", (done) => {
//             chai.request(app)
//             .get(`/api/v1/trips/filter/origin?query=none`)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(404);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('error');
//                 expect(body.status).to.equal("error");
//                 expect(body.error).to.be.a("string");
//                 expect(body.error).to.equal("No trip available");
//                 done()
//             })
//         });
//     });
