import { it } from 'mocha';
import {assert, expect} from 'chai';

import Mailer from '../server/utils/mailer';
import BookingController from '../server/controller/booking';
import upload from '../server/utils/cloudinary';
import AuthController from '../server/controller/auth';
import TripController from '../server/controller/trip';

// it('should return success', async (done) => {
    
//     const mail = await Mailer.createAccountMessage("email");

//     console.log(mail)
//     assert.equal(typeof mail, 'string')
//     done();
// });

it('should return undefined', async () => {
    const bookings = [
        {seat_number: 1},
        {seat_number: 2},
        {seat_number:3}
    ]
    const book = await BookingController.checkSeat(bookings, 4);

    assert.equal(book, undefined);
});

it('should return seat number', async () => {

    const book = await BookingController.fetchSeat([1,2,3], [1]);

    assert.equal(book, 2);
});

it('should return seat number', async () => {
    const bookings = [
        {seat_number: 1},
        {seat_number: 2},
        {seat_number:3}
    ]
    const book = await BookingController.assignSeatNumber(bookings, 5);

    assert.equal(book, 4);
});

it('should return false', async () => {
    const trip = await BookingController.findTrip(10);

    assert.equal(trip, false);
});

it('should return false', async () => {
    const req = '1562914819676pic.jpg';
    const cloud = await upload(req);

    assert.equal(cloud, false);
});

it('should response to be an object', async () => {
    const findUser = {
        first_name: "A",
        last_name: "B",
        is_admin: "true",
        password: "qwerty"
    }

    const req = {
        body: {
            first_name: "Q", 
            last_name: "A", 
            is_admin: "false", 
            password: "abcd"
        }
    }
    const cloud = await AuthController.bodyParams(req, findUser);

    expect(cloud.firstname).to.equal("Q");

});

it('should response to be an object', async () => {
    const findUser = {
        first_name: "A",
        last_name: "B",
        is_admin: "true",
        password: "qwerty"
    }

    const req = {
        body: 1
    }
    const cloud = await AuthController.bodyParams(req, findUser);

    expect(cloud.firstname).to.equal("A");
});

it('should response to be an object', async () => {
    const findTrip = {
        bus_id: "A",
        origin: "B",
        destination: "true",
        trip_date: "qwerty",
        trip_time: 1,
        fare:1,
        status: 0
    }

    const req = {
        body: {
            bus_id: "Q",
            origin: "B",
            destination: "true",
            trip_date: "qwerty",
            trip_time: 1,
            fare:1,
            status: 0
        }
    }
    const body = await TripController.bodyParams(req, findTrip);

    expect(body.busId).to.equal("Q");

});

it('should response to be an object', async () => {
    const findTrip = {
        bus_id: "A",
        origin: "B",
        destination: "true",
        trip_date: "qwerty",
        trip_time: 1,
        fare:1,
        status: 0
    }

    const req = {
        body: 1
    }
    const body = await TripController.bodyParams(req, findTrip);

    expect(body.busId).to.equal("A");
});

// it('should return false', async () => {
//     const req = {
//         file:'1562914819676pic.jpg',
//         body: 2
//     };
//     const upload = await AuthController.uploadImage(req, '');

//     assert.equal(upload, '');
// });

// Statements   : 96.96% ( 319/329 )
// Branches     : 91.16% ( 134/147 )
// Functions    : 96.36% ( 53/55 )
// Lines        : 96.93% ( 316/326 )