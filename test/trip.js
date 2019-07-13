import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import moment from '../server/utils/moment';

import app from '../server/app';

chai.should();

chai.use(chaiHttp);
let token;
let notAdmin;
let trip_id;
let bus_id;
let origin;
let destination;

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
          notAdmin = body.data.token;

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
          token = body.data.token;

          done();
        });
    });
  });
  describe('POST /api/v1/trips', () => {
    it('should return all trips', (done) => {
      chai.request(app)
        .get('/api/v1/trips')
        .set('token', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(404);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('There are no trips');
          done();
        });
    });

    it('should add a bus', (done) => {
      chai.request(app)
        .post('/api/v1/bus')
        .set('token', token)
        .send({
          number_plate: 'ABC123DERE',
          manufacturer: 'Toyota',
          model: 'Siena',
          year: 2008,
          capacity: 5,
        })
        .then((res) => {
          const { body } = res;
          bus_id = body.data.bus_id
          done();
        });
    });

    it('should create a trip', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('token', token)
        .send({
          bus_id: bus_id,
          origin: 'Ikeja',
          destination: 'CMS',
          trip_date: '10/12/2019',
          trip_time: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          trip_id = body.data.trip_id;
          expect(res.status).to.equal(201);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('object');
          done();
        });
    });

    it('should check for trip that already exists', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('token', token)
        .send({
          bus_id: bus_id,
          origin: 'Ikeja',
          destination: 'CMS',
          trip_date: '10/12/2019',
          trip_time: '4:21:38 AM',
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

    it('should check for bus that does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('token', token)
        .send({
          bus_id: 'e1127021-20f0-a61f-9575',
          origin: 'Ikeja',
          destination: 'CMS',
          trip_date: '10/12/2019',
          trip_time: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(404);
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
        .set('token', notAdmin)
        .send({
          bus_id: 'e1127021-20f0-a61f-9575-801f369d9fda',
          origin: 'Ikeja',
          destination: 'CMS',
          trip_date: '10/12/2019',
          trip_time: '4:21:38 AM',
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
        .set('token', token)
        .send({
          bus_id: 1,
          origin: 'Ikeja',
          destination: 'CMS',
          trip_date: '10/12/2019',
          trip_time: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(400);
          expect(body).to.contain.property('error');
          expect(body.error).to.be.a('string');
          expect(body.error).to.equal('Bus ID is a string');
          done();
        });
    });

    it('should check for wrong trip origin format', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('token', token)
        .send({
          bus_id: '1',
          origin: 2,
          destination: 'CMS',
          trip_date: '10/12/2019',
          trip_time: '4:21:38 AM',
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
        .set('token', token)
        .send({
          bus_id: '1',
          origin: 'Ikeja',
          destination: 1,
          trip_date: '10/12/2019',
          trip_time: '4:21:38 AM',
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
        .set('token', token)
        .send({
          bus_id: '1',
          origin: 'Ikeja',
          destination: 'CMS',
          trip_date: 24,
          trip_time: '4:21:38 AM',
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

    it('should check for fare format', (done) => {
      chai.request(app)
        .post('/api/v1/trips')
        .set('token', token)
        .send({
          bus_id: '1',
          origin: 'Ikeja',
          destination: 'CMS',
          trip_date: '10/12/2019',
          trip_time: '4:21:38 AM',
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

  describe('DELETE /api/v1/trips/:trip_id', () => {
    it('should cancel a trip', (done) => {
      chai.request(app)
        .delete(`/api/v1/trips/${trip_id}`)
        .set('token', token)
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
        .set('token', notAdmin)
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
        .set('token', token)
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
        .set('token', token)
        .send({
          bus_id: bus_id,
          origin: 'Ikeja',
          destination: 'CMS',
          trip_date: '2019-01-01',
          trip_time: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          trip_id = body.data.trip_id;
          done();
        });
    });

    it('should check for trip that cannot be canceled', (done) => {
      chai.request(app)
        .delete(`/api/v1/trips/${trip_id}`)
        .set('token', token)
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

  describe('GET /api/v1/trips', () => {
    it('should return all trips', (done) => {
      chai.request(app)
        .get('/api/v1/trips')
        .set('token', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(200);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/v1/trips/search?', () => {
    it('should fetch all trips', (done) => {
      chai.request(app)
        .get('/api/v1/trips/search')
        .set('token', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(200);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('array');
          done();
        });
    });

    it('should search for trips match query origin', (done) => {
      chai.request(app)
        .get('/api/v1/trips/search?origin=Ikeja')
        .set('token', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(200);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('array');
          done();
        });
    });

    it('should search for trips match query destination', (done) => {
      chai.request(app)
        .get('/api/v1/trips/search?destination=CMS')
        .set('token', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(200);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('array');
          done();
        });
    });

    it('should search for trips match query origin and destination', (done) => {
      chai.request(app)
        .get('/api/v1/trips/search?origin=Ikeja&destination=CMS')
        .set('token', token)
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(200);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.an('array');
          done();
        });
    });

    it("should return error if origin does not exist", (done) => {
      chai.request(app)
      .get(`/api/v1/trips/search?origin=none`)
      .set('token', token)
      .then((res) => {
          const body = res.body;
          expect(res.status).to.equal(404);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal("error");
          expect(body.error).to.be.a("string");
          expect(body.error).to.equal("There are no trips");
          done()
      })
    });

    it("should return error if destination does not exist", (done) => {
      chai.request(app)
      .get(`/api/v1/trips/search?destination=none`)
      .set('token', token)
      .then((res) => {
          const body = res.body;
          expect(res.status).to.equal(404);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('error');
          expect(body.status).to.equal("error");
          expect(body.error).to.be.a("string");
          expect(body.error).to.equal("There are no trips");
          done()
      })
    });

  });

  describe('PATCH /api/v1/trips/:trip_id', () => {

    it('should check for trip that does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/trips/none')
        .set('token', token)
        .send({
          bus_id: bus_id,
          origin: 'Ikeja',
          destination: 'CMS',
          trip_date: '10/12/2019',
          trip_time: '4:21:38 AM',
          fare: 500.00,
        })
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

    it('should update trip', (done) => {
      chai.request(app)
        .patch(`/api/v1/trips/${trip_id}`)
        .set('token', token)
        .send({
          bus_id: bus_id,
          origin: 'Ikeja',
          destination: 'CMS',
          trip_date: '10/12/2019',
          trip_time: '4:21:38 AM',
          fare: 500.00,
        })
        .then((res) => {
          const { body } = res;
          expect(res.status).to.equal(200);
          expect(body).to.contain.property('status');
          expect(body).to.contain.property('data');
          expect(body.status).to.equal('success');
          expect(body.data).to.be.a('object');
          done();
        });
    });
  });
});


//     describe('GET /api/v1/trips/trip/:trip_id', () => {
//         it('should get the details of a trip',  (done) => {
//             chai.request(app)
//             .get(`/api/v1/trips/trip/${trip_id}`)
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

//     describe('DELETE /api/v1/trips/cancel/:trip_id', () => {
//         it('should cancel the trip',  (done) => {
//             chai.request(app)
//             .delete(`/api/v1/trips/cancel/${trip_id}`)
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
