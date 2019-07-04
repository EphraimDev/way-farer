import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.should();

chai.use(chaiHttp);
let token = 'bearer ';
let notAdmin = 'bearer ';
let tripId;
let busId;
let bookingId;

describe('Bookings', () => {
    describe('Get tokens', () => {
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

        it('should login a user', (done) => {
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
      });

    describe('POST /api/v1/bookings', () => {
      it('should check for trip ID format', (done) => {
        chai.request(app)
          .post('/api/v1/bookings')
          .set('authorization', token)
          .send({
            tripId: 1
          })
          .then((res) => {
            const { body } = res;
            expect(res.status).to.equal(400);
            expect(body).to.contain.property('error');
            expect(body.error).to.be.a('string');
            expect(body.error).to.equal('Trip ID is a string');
            done();
          });
      });

      it('should check for seat format', (done) => {
        chai.request(app)
          .post('/api/v1/bookings')
          .set('authorization', token)
          .send({
            tripId: "3",
            seat: "23"
          })
          .then((res) => {
            const { body } = res;
            expect(res.status).to.equal(400);
            expect(body).to.contain.property('error');
            expect(body.error).to.be.a('string');
            expect(body.error).to.equal('Seat is a number');
            done();
          });
      });
        it('should add a bus', (done) => {
            chai.request(app)
              .post('/api/v1/bus')
              .set('authorization', token)
              .send({
                numberPlate: 'ABC123DEQ',
                manufacturer: 'Toyota',
                model: 'Siena',
                year: 2008,
                capacity: 2,
              })
              .then((res) => {
                const { body } = res;
                busId = body.data.bus_id;
                done();
              });
          });
          
        it('should create a trip', (done) => {
            chai.request(app)
              .post('/api/v1/trips')
              .set('authorization', token)
              .send({
                busId: busId,
                origin: 'Ikeja',
                destination: 'CMS',
                tripDate: '2020-02-01',
                tripTime: '4:21:38 AM',
                fare: 500.00,
              })
              .then((res) => {
                const { body } = res;
                tripId = body.data.trip_id;
                done();
              });
          });

          it('should check for trip that does not exist', (done) => {
            chai.request(app)
            .post('/api/v1/bookings')
            .set('authorization', token)
            .send({
                tripId: '5',
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Selected trip does not exist");
                done()
            })
        });

        it('should book a trip',  (done) => {
            chai.request(app)
            .post('/api/v1/bookings')
            .set('authorization', token)
            .send({
                tripId: tripId,
                seat: 1
            })
            .then((res) => {
                const body = res.body;
                tripId = body.data.trip_id;
                expect(res.status).to.equal(201);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.data).to.contain.property('id');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("object");
                done()
            })
        });

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

        it('should check for trip not available', (done) => {
            chai.request(app)
            .post('/api/v1/bookings')
            .set('authorization', token)
            .send({
                tripId: tripId,
                seat: 3
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("This trip is not available");
                done()
            })
        });

        it('should create a trip', (done) => {
          chai.request(app)
            .post('/api/v1/trips')
            .set('authorization', token)
            .send({
              busId: busId,
              origin: 'Ikeja',
              destination: 'CMS',
              tripDate: '2020-02-01',
              tripTime: '4:21:38 AM',
              fare: 500.00,
            })
            .then((res) => {
              const { body } = res;
              tripId = body.data.trip_id;
              done();
            });
        });

        it('should book a trip',  (done) => {
          chai.request(app)
          .post('/api/v1/bookings')
          .set('authorization', token)
          .send({
              tripId: tripId,
              seat: 2
          })
          .then((res) => {
              const body = res.body;
              tripId = body.data.trip_id;
              bookingId = body.data.booking_id;
              expect(res.status).to.equal(201);
              expect(body).to.contain.property('status');
              expect(body).to.contain.property('data');
              expect(body.data).to.contain.property('id');
              expect(body.status).to.equal("success");
              expect(body.data).to.be.an("object");
              done()
          })
      });

        it('should check for taken seat number', (done) => {
            chai.request(app)
            .post('/api/v1/bookings')
            .set('authorization', token)
            .send({
                tripId:tripId,
                seat: 2
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(400);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Seat number is not available");
                done()
            })
        });
    });

      describe('GET /api/v1/bookings', () => {
        it('should return all bookings',  (done) => {
            chai.request(app)
            .get('/api/v1/bookings')
            .set('authorization', token)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('data');
                expect(body.status).to.equal("success");
                expect(body.data).to.be.an("array");
                done()
            })
        });

      it('should return error for no bookings',  (done) => {
        chai.request(app)
        .get('/api/v1/bookings')
        .set('authorization', notAdmin)
        .then((res) => {
            const body = res.body;
            expect(res.status).to.equal(404);
            expect(body).to.contain.property('status');
            expect(body).to.contain.property('error');
            expect(body.status).to.equal("error");
            expect(body.error).to.be.equal("There are no bookings");
            done()
        })
    });
  });

      describe('DELETE /api/v1/bookings/:bookingId', () => {
        it('should add a bus', (done) => {
          chai.request(app)
            .post('/api/v1/bus')
            .set('authorization', token)
            .send({
              numberPlate: 'ABCs1we23DEQ',
              manufacturer: 'Toyota',
              model: 'Siena',
              year: 2008,
              capacity: 2,
            })
            .then((res) => {
              const { body } = res;
              busId = body.data.bus_id;
              done();
            });
        });
        
      it('should create a trip', (done) => {
          chai.request(app)
            .post('/api/v1/trips')
            .set('authorization', token)
            .send({
              busId: busId,
              origin: 'Ikeja',
              destination: 'CMS',
              tripDate: '2030-02-01',
              tripTime: '4:21:38 AM',
              fare: 500.00,
            })
            .then((res) => {
              const { body } = res;
              tripId = body.data.trip_id;
              done();
            });
        });

        it('should book a trip',  (done) => {
          chai.request(app)
          .post('/api/v1/bookings')
          .set('authorization', token)
          .send({
              tripId: tripId,
              seat: 2
          })
          .then((res) => {
              const body = res.body;
              bookingId = body.data.booking_id;
              done()
          })
      });

        it('should cancel the booking',  (done) => {
          console.log(bookingId)
            chai.request(app)
            .delete(`/api/v1/bookings/${bookingId}`)
            .set('authorization', token)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(200);
                expect(body).to.contain.property('status');
                expect(body.status).to.equal("success");
                done()
            })
        });

        it("should fail for booking that don't exists", (done) => {
            chai.request(app)
            .delete('/api/v1/bookings/bookingId')
            .set('authorization', token)
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equal(404);
                expect(body).to.contain.property('status');
                expect(body).to.contain.property('error');
                expect(body.status).to.equal("error");
                expect(body.error).to.be.a("string");
                expect(body.error).to.equal("Booking does not belong to user");
                done()
            })
        });

    });
})

//     describe('PUT /api/v1/booking/modify/:bookingId', () => {
//         it('should modify a booking',  (done) => {
//             chai.request(app)
//             .put(`/api/v1/booking/modify/${bookingId}`)
//             .set('Authorization', token)
//             .send({
//                 seat_no: 1
//             })
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

//         it("should fail for booking that don't exists", (done) => {
//             chai.request(app)
//             .put('/api/v1/trips/modify/none')
//             .set('Authorization', token)
//             .send({
//                 seat_no: 1
//             })
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(404);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('error');
//                 expect(body.status).to.equal("error");
//                 expect(body.error).to.be.a("string");
//                 expect(body.error).to.equal("This booking does not exist");
//                 done()
//             })
//         });

//         it('should check for trip that has been started', (done) => {
//             chai.request(app)
//             .put('/api/v1/trips/modify/2')
//             .set('Authorization', token)
//             .send({
//                 seat_no: 5
//             })
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(400);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('error');
//                 expect(body.status).to.equal("error");
//                 expect(body.error).to.be.a("string");
//                 expect(body.error).to.equal("This trip has started already");
//                 done()
//             })
//         });
//     });



//     describe('GET /api/v1/booking/user/:userId', () => {
//         it('should get the all bookings made by the user',  (done) => {
//             chai.request(app)
//             .get(`/api/v1/booking/user/${userId}`)
//             .set('Authorization', token)
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

//         it("should fail for user that don't exist", (done) => {
//             chai.request(app)
//             .get(`/api/v1/booking/user/none}`)
//             .set('Authorization', token)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(404);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('error');
//                 expect(body.status).to.equal("error");
//                 expect(body.error).to.be.a("string");
//                 expect(body.error).to.equal("User does not exist");
//                 done()
//             })
//         });
//     });



//     describe('GET /api/v1/booking/single/:bookingId', () => {
//         it('should return the booking data', (done) => {
//             chai.request(app)
//             .get(`/api/v1/booking/single/${bookingId}`)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(200);
//                 expect(body).to.contain.property('status');
//                 expect(body.status).to.equal("success");
//                 done()
//             })
//         });

//         it("should return error for wrong booking ID", (done) => {
//             chai.request(app)
//             .get(`/api/v1/booking/single/none`)
//             .then((res) => {
//                 const body = res.body;
//                 expect(res.status).to.equal(404);
//                 expect(body).to.contain.property('status');
//                 expect(body).to.contain.property('error');
//                 expect(body.status).to.equal("error");
//                 expect(body.error).to.be.a("string");
//                 expect(body.error).to.equal("This booking does not exist");
//                 done()
//             })
//         });
//     });
// })